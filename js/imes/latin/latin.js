/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

/*
 * This latin input method provides four forms of input assistance:
 *
 * 1) word suggestions
 *
 * 2) auto correction
 *
 * 3) auto capitalization
 *
 * 4) punctuation assistance by converting space space to period space
 *    and by transposing space followed by punctuation.
 *
 * These input modifications are controlled by the type and inputmode
 * properties of the input element that has the focus. If inputmode is
 * "verbatim" then the input method does not modify the user's input in any
 * way. See getInputMode() for a description of input modes.
 *
 * TODO:
 *
 *  when deciding whether to autocorrect, if the first 2 choices are
 *    a prefix of one another, then consider the ratio of 1st to 3rd instead
 *    of 1st to second possibly?  If there different forms of the same word
 *    and that word is the most likely, then substitute it?
 *
 *  add a per-language settings-based list of customizable corrections?
 *
 *  Display an X icon in the suggestions line to give the user a way
 *  to dismiss an autocorrection?  (Easier than space, backspace, space).
 *
 *  Display a + icon in the suggestions line to give the user a way to
 *  add the current input to a personal word list so it doesn't get
 *  auto-corrected?
 *
 *  Use color somehow to indicate that a word is properly spelled?
 *
 *  Make the phone vibrate when it makes an automatic corection?
 */
(function() {
  // Register ourselves in the keyboard's set of input methods
  // The functions used here are all defined below
  InputMethods.latin = {
    init: init,
    activate: activate,
    deactivate: deactivate,
    displaysCandidates: displaysCandidates,
    click: click,
    select: select,
    setLayoutParams: setLayoutParams,
    setLanguage: setLanguage
  };

  // This is the object that is passed to init().
  // We use the methods of this object to communicate with the keyboard.
  var keyboard;

  // If defined, this is a worker thread that produces word suggestions for us
  var worker;

  // These variables are the input method's state. Most of them are
  // passed to the activate() method or are derived in that method.
  var language;           // The user's language
  var inputMode;          // The inputmode we're using: see getInputMode()
  var capitalizing;       // Are we auto-capitalizing for this activation?
  var suggesting;         // Are we offering suggestions for this activation?
  var correcting;         // Are we auto-correcting user input?
  var punctuating;        // Are we offering punctuation assistance?
  var inputText;          // The input text
  var cursor;             // The insertion position
  var selection;          // The end of the selection, if there is one, or 0
  var lastSpaceTimestamp; // If the last key was a space, this is the timestamp
  var layoutParams;       // Parameters passed to setLayoutParams
  var nearbyKeyMap;       // Map keys to nearby keys
  var serializedNearbyKeyMap; // A stringified version of the above
  var idleTimer;          // Used by deactivate
  var suggestionsTimer;   // Used by updateSuggestions;
  var autoCorrection;     // Correction to make if next input is space
  var revertTo;           // Revert to this on backspace after autocorrect
  var revertFrom;         // Revert away from this on backspace
  var justAutoCorrected;  // Was last change an auto correction?
  var correctionDisabled; // Temporarily diabled after reverting?

  // Terminate the worker when the keyboard is inactive for this long.
  const workerTimeout = 30000;  // 30 seconds of idle time

  // If we get an autorepeating key is sent to us, don't offer suggestions
  // for this long, until we're pretty certain that the autorepeat
  // has stopped.
  const autorepeatDelay = 250;

  // Some keycodes that we use
  const SPACE = KeyEvent.DOM_VK_SPACE;
  const BACKSPACE = KeyEvent.DOM_VK_BACK_SPACE;
  const RETURN = KeyEvent.DOM_VK_RETURN;
  const PERIOD = 46;
  const QUESTION = 63;
  const EXCLAMATION = 33;
  const COMMA = 44;
  const COLON = 58;
  const SEMICOLON = 59;

  const WS = /^\s+$/;                    // all whitespace characters

  // word separator characters
  // U+FFFC is the placeholder character for non-text object
  const WORDSEP = /^[\s.,?!;:\ufffc]+$/;

  const DOUBLE_SPACE_TIME = 700; // ms between spaces to convert to ". "

  // Don't offer to autocorrect unless we're reasonably certain that the
  // user wants this correction. The first suggested word must be at least
  // this much more highly weighted than the second suggested word.
  // XXX: this seems too low, but we get a root word and the root with suffix
  // that have similar weights, and should probably auto correct on one.
  // Maybe the prediction engine should weight on the length of the word so
  // that we can raise this to 1.25 or something.
  const AUTO_CORRECT_THRESHOLD = 1.05;

  // keyboard.js calls this to pass us the interface object we need
  // to communicate with it
  function init(interfaceObject) {
    keyboard = interfaceObject;
  }

  // Given the type property and inputmode attribute of a form element,
  // this function returns the inputmode that this IM should use. The
  // return value will be one of these strings:
  //
  //   'verbatim': don't alter the user's input at all
  //   'latin': offer word suggestions/corrections, but no capitalization
  //   'latin-prose': offer word suggestions and capitalization
  //
  function getInputMode(type, mode) {
    // For text, textarea and search types, use the requested inputmode
    // if it is valid and supported except numeric/digit mode. For
    // numeric/digit mode, we return verbatim since no typing assitance
    // is required. Otherwise default to latin for text and search and to
    // latin-prose for textarea. For all other form fields, use verbatim mode
    // so we never alter input.
    switch (type) {
      case 'text':
      case 'textarea':
      case 'search':
        switch (mode) {
          case 'verbatim':
          case 'latin':
          case 'latin-prose':
            return mode;
          case 'numeric':
          case 'digit':
            return 'verbatim';
          default:
            return (type === 'textarea') ? 'latin-prose' : 'latin';
        }

      default:
        return 'verbatim';
    }
  }

  // This gets called whenever the keyboard pops up to tell us everything
  // we need to provide useful typing assistance. It also gets called whenever
  // the user taps on an input field to move the cursor. That means that there
  // may be multiple calls to activate() without calls to deactivate between
  // them.
  function activate(lang, state, options) {
    inputMode = getInputMode(state.type, state.inputmode);
    inputText = state.value;
    cursor = state.selectionStart;
    if (state.selectionEnd > state.selectionStart)
      selection = state.selectionEnd;
    else
      selection = 0;

    // Figure out what kind of input assistance we're providing for this
    // activation.
    capitalizing = punctuating = (inputMode === 'latin-prose');
    suggesting = (options.suggest && inputMode !== 'verbatim');
    correcting = (options.correct && inputMode !== 'verbatim');

    // Reset our state
    lastSpaceTimestamp = 0;
    autoCorrection = null;
    revertTo = revertFrom = '';
    justAutoCorrected = false;
    correctionDisabled = false;

    // The keyboard isn't idle anymore, so clear the timer
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }

    // Start off with the correct capitalization
    updateCapitalization();

    // If we are going to offer suggestions, ensure that there is a worker
    // thread created and that it knows what language we're using, and then
    // start things off by requesting a first batch of suggestions.
    if (suggesting || correcting) {
      if (!worker || lang !== language)
        setLanguage(lang);  // This calls updateSuggestions
      else
        updateSuggestions();
    }
  }

  function deactivate() {
    if (!worker || idleTimer)
      return;
    idleTimer = setTimeout(terminateWorker, workerTimeout);
  }

  function terminateWorker() {
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
    if (worker) {
      worker.terminate();
      worker = null;
      keyboard.sendCandidates([]); // Clear any displayed suggestions
      autoCorrection = null;       // and forget any pending correction.
    }
  }

  function setLanguage(newlang) {
    // If there is no worker and no language, or if there is a worker and
    // the language has not changed, then there is nothing to do here.
    if ((!worker && !newlang) || (worker && newlang === language))
      return;

    // If there is a worker, and no new language, then kill the worker
    if (worker && !newlang) {
      terminateWorker();
      return;
    }

    // If we get here, then we have to create a worker and set its language
    // or change the language of an existing worker.
    if (!worker) {
      // If we haven't created the worker before, do it now
      worker = new Worker('js/imes/latin/worker.js');
      if (layoutParams && nearbyKeyMap)
        worker.postMessage({ cmd: 'setNearbyKeys', args: [nearbyKeyMap]});

      worker.onmessage = function(e) {
        switch (e.data.cmd) {
        case 'log':
          console.log(e.data.message);
          break;
        case 'error':
          console.error(e.data.message);
          // If the error was a result of our setLanguage call, then
          // kill the worker because it can't do anything without
          // a valid dictionary.
          if (e.data.message.startsWith('setLanguage')) {
            terminateWorker();
          }
          break;
        case 'predictions':
          // The worker is suggesting words: ask the keyboard to display them
          handleSuggestions(e.data.input, e.data.suggestions);
          break;
        }
      };
    }

    // Tell the worker what language we're using. They may cause it to
    // load or reload its dictionary.
    language = newlang;  // Remember the new language
    worker.postMessage({ cmd: 'setLanguage', args: [language]});

    // And now that we've changed the language, ask for new suggestions
    updateSuggestions();
  }

  function displaysCandidates() {
    return suggesting && worker;
  }

  /*
   * The keyboard calls this method to tell us about user input.
   *
   * What we do with the input depends on various things:
   *
   * - whether we are suggesting, correcting, punctuating and/or capitalizing:
   *   these are controlled by settings, input mode and input type
   *
   * - whether there is a selected region in the input field
   *
   * - whether there is an auto-correction ready (when input is space
   *   or punctuation).
   *
   * - whether the last action was an autocorrection (when input is backspace)
   *
   * - the cursor position (affects suggestions, capitalization, etc.)
   *
   * If there is a selection just handle simple insertions and deletions
   * with no extra behavior. (I think)
   *
   * If input is a space or punctuation:
   *
   *  If there is a autocorrection ready, and we are correcting and
   *  the cursor is at the end of a word, make the correction
   *
   *  If the previous character is a space, fix the punctuation. Note that
   *  this only works for a subset of the punctuation characters.
   *
   *  Otherwise just insert it.
   *
   *  If we're correcting and corrections are temporarily diabled, turn them
   *  back on.
   *
   * If input is a backspace:
   *
   *  If we just did an auto-correction, revert it and turn off corrections
   *  until the next space or punctuation character.
   *
   *  If we just inserted a suggested word that the user selected, revert
   *  the insertion, but don't disable autocorrect.
   *
   *  Should we undo punctuation corrections this way, too?
   *
   *  Otherwise, just delete the character before the cursor
   *
   * For any other input character, just insert it.
   *
   * Reset the backspace reversion state
   *
   * Update the capitalization state, if we're capitalizing
   */
  function click(keycode, repeat) {
    // If the key is anything other than a backspace, forget about any
    // previous changes that we would otherwise revert.
    if (keycode !== BACKSPACE) {
      revertTo = revertFrom = '';
      justAutoCorrected = false;
    }

    if (selection) {
      // If there is selected text, don't do anything fancy here.
      handleKey(keycode);
    }
    else {
      switch (keycode) {
      case SPACE:        // This list of characters matches the WORDSEP regexp
      case RETURN:
      case PERIOD:
      case QUESTION:
      case EXCLAMATION:
      case COMMA:
      case COLON:
      case SEMICOLON:
        // These keys may trigger word or punctuation corrections
        handleCorrections(keycode);
        correctionDisabled = false;
        break;

      case BACKSPACE:
        handleBackspace();
        break;

      default:
        handleKey(keycode);
      }
    }

    // If there was a potential auto correction, we either used it in
    // handleCorrections() above or it is now out of date, so clear it
    // so it doesn't get used later
    autoCorrection = null;

    // And update the keyboard capitalization state, if necessary
    updateCapitalization();

    // If we're offering suggestions, ask the worker to make them now
    updateSuggestions(repeat);

    // Exit symbol layout mode after space or return key is pressed.
    if (keycode === SPACE || keycode === RETURN) {
      keyboard.setLayoutPage(LAYOUT_PAGE_DEFAULT);
    }

    lastSpaceTimestamp = (keycode === SPACE) ? Date.now() : 0;
  }

  // Handle any key (including backspace) and do the right thing even if
  // there is a selection in the text field. This method does not perform
  // auto-correction or auto-punctuation.
  function handleKey(keycode) {
    // First, update our internal state
    if (keycode === BACKSPACE) {
      if (selection) {
        // backspace while a region is selected erases the selection
        // and leaves the cursor at the selection start
        inputText = inputText.substring(0, cursor) +
          inputText.substring(selection);
        selection = 0;
      } else if (cursor > 0) {
        cursor--;
        inputText = inputText.substring(0, cursor) +
          inputText.substring(cursor + 1);

        // If we have temporarily disabled auto correction for the current word
        // and we've just backspaced over the entire word, then we can
        // re-enabled it again
        if (correctionDisabled && !wordBeforeCursor())
          correctionDisabled = false;
      }
    } else {
      if (selection) {
        inputText =
          inputText.substring(0, cursor) +
          String.fromCharCode(keycode) +
          inputText.substring(selection);
        selection = 0;
      } else {
        inputText =
          inputText.substring(0, cursor) +
          String.fromCharCode(keycode) +
          inputText.substring(cursor);
      }
      cursor++;
    }

    // Generate the key event
    keyboard.sendKey(keycode);
  }

  // Assuming that the word before the cursor is oldWord, send a
  // minimal number of key events to change it to newWord in the text
  // field. Also update our internal state to match the new textfield
  // content and cursor position.
  function replaceBeforeCursor(oldWord, newWord) {
    var oldWordLen = oldWord.length;
    if (keyboard.replaceSurroundingText) {
      keyboard.replaceSurroundingText(newWord, oldWordLen, 0);
    }
    else {
      // Find the first character in currentWord and newWord that differs
      // so we know how many backspaces we need to send.
      for (var firstdiff = 0; firstdiff < oldWordLen; firstdiff++) {
        if (oldWord[firstdiff] !== newWord[firstdiff])
          break;
      }

      // Backspace as far as that first difference
      for (var i = oldWordLen; i > firstdiff; i--)
        keyboard.sendKey(BACKSPACE);

      // And send the first different character and all that follow
      keyboard.sendString(newWord.substring(firstdiff));
    }

    // Now update internal state
    inputText =
      inputText.substring(0, cursor - oldWordLen) +
      newWord +
      inputText.substring(cursor);
    cursor += newWord.length - oldWordLen;
  }

  // If we just did auto correction or auto punctuation, then backspace
  // should undo it. Otherwise it is just an ordinary backspace.
  function handleBackspace() {
    // If we made a correction and haven't changed it at all yet,
    // then revert it.
    var len = revertFrom ? revertFrom.length : 0;
    if (len && cursor >= len &&
        inputText.substring(cursor - len, cursor) === revertFrom) {

      // Revert the content of the text field
      replaceBeforeCursor(revertFrom, revertTo);

      // If the change we just reverted was an auto-correction then
      // temporarily disable auto correction until the next space
      if (justAutoCorrected) {
        correctionDisabled = true;
      }

      revertFrom = revertTo = '';
      justAutoCorrected = false;
    }
    else {
      handleKey(BACKSPACE);
    }
  }

  // This function is called when the user types space, return or a punctuation
  // character. It performs auto correction or auto punctuation or just
  // inserts the character.
  function handleCorrections(keycode) {
    if (correcting && autoCorrection && !correctionDisabled && atWordEnd() &&
        wordBeforeCursor() !== autoCorrection) {
      autoCorrect(keycode);
    }
    else if (punctuating && cursor >= 2 &&
             isWhiteSpace(inputText[cursor - 1]) &&
             !WORDSEP.test(inputText[cursor - 2]))
    {
      autoPunctuate(keycode);
    }
    else {
      handleKey(keycode);
    }
  }

  // Perform an autocorrection. Assumes that all pre-conditions for
  // auto-correction have been met.
  function autoCorrect(keycode) {
    // Get the word before the cursor
    var currentWord = wordBeforeCursor();

    // The space or punctuation that triggered the autocorrect
    var delimiter = String.fromCharCode(keycode);

    // Figure out the auto correction text
    var newWord = autoCorrection + delimiter;

    // Make the correction
    replaceBeforeCursor(currentWord, newWord);

    // Remember the change we just made so we can revert it if the
    // user types backspace
    revertTo = currentWord + delimiter;
    revertFrom = newWord;
    justAutoCorrected = true;
  }

  // Auto punctuate, converting space punctuation to punctuation space
  // or converting space space to period space if the two spaces were
  // close enough together. Assumes that pre-conditions for auto punctuation
  // have been met.
  function autoPunctuate(keycode) {
    switch (keycode) {
    case SPACE:
      if (Date.now() - lastSpaceTimestamp < DOUBLE_SPACE_TIME)
        fixPunctuation(PERIOD, SPACE);
      else
        handleKey(keycode);
      break;

    case PERIOD:
    case QUESTION:
    case EXCLAMATION:
    case COMMA:
      fixPunctuation(keycode);
      break;

    default:
      // colon and semicolon don't auto-punctuate because they're
      // used after spaces for smileys.
      handleKey(keycode);
      break;
    }

    // In both the space space and the space period case we call this function
    // Second argument is the character reverting to if cancelling auto
    // punctuation
    // If the second argument is omitted, assume it is the same as the first
    function fixPunctuation(keycode, revertToKeycode) {
      keyboard.sendKey(BACKSPACE);
      keyboard.sendKey(keycode);
      keyboard.sendKey(SPACE);

      var newtext = String.fromCharCode(keycode) + ' ';
      inputText = inputText.substring(0, cursor - 1) +
        newtext +
        inputText.substring(cursor);
      cursor++;

      // Remember this change so we can revert it on backspace
      revertTo = ' ' + String.fromCharCode(revertToKeycode || keycode);
      revertFrom = newtext;
      justAutoCorrected = false;
    }
  }

  // When the worker thread sends us a batch of suggestions, deal
  // with them here.
  function handleSuggestions(input, suggestions) {
    // If we didn't get any suggestions just send the empty array to
    // clear any suggestions that are currently displayed. Do the same
    // if the word before the cursor has changed since we requested
    // these suggestions. That is, if the user has typed faster than we could
    // offer suggestions, ignore them.
    if (suggestions.length === 0 || wordBeforeCursor() !== input) {
      keyboard.sendCandidates([]); // Clear any displayed suggestions
      return;
    }

    // Loop through the suggestions discarding the weights
    var lcinput = input.toLowerCase();
    for (var i = 0; i < suggestions.length; i++) {
      suggestions[i] = suggestions[i][0];
    }

    // Now figure out if the input is one of the suggestions
    var inputindex = suggestions.indexOf(input);

    // If the input is just one character long then we never want to
    // auto-correct to more than one character (because it makes it hard
    // to type abbreviations and other single-characters uses).  So if the
    // first suggestion is not also one-character, then make the input
    // into the first suggestion.
    if (input.length === 1 && suggestions[0].length !== 1) {
      if (inputindex === -1)                // If the input is not a suggestion
        suggestions.pop();                  // Remove the last suggestion
      else                                  // Otherwise
        suggestions.splice(inputindex, 1);  // Remove the input
      suggestions.unshift(input);           // Then add it at the start
      inputindex = 0;                       // Update inputindex
    }

    switch (inputindex) {
    case -1:
      // Input is not a word: show it second in the list
      if (suggestions.length > 1)
        suggestions = [suggestions[0], input, suggestions[1]];
      else
        suggestions = [suggestions[0], input];
      break;
    case 0:
    case 1:
      // Input is the same as the first suggestion or is already in
      // the second position: use the suggestions unmodified
      break;
    case 2:
      // Input is the 3rd suggestion: swap to make it second
      suggestions = [suggestions[0], input, suggestions[1]];
      break;
    }

    // If we're going to use the first suggestion as an auto-correction
    // then we have to tell the renderer to highlight it.
    if (correcting && !correctionDisabled) {
      // Remember the word to use if the next character is a space.
      autoCorrection = suggestions[0];
      // Mark the auto-correction so the renderer can highlight it
      suggestions[0] = '*' + suggestions[0];
    }

    keyboard.sendCandidates(suggestions);
  }

  // If the user selects one of the suggestions offered by this input method
  // the keyboard calls this method to tell us it has been selected.
  // We have to backspace over the current word, insert this new word, and
  // update our internal state to match.
  function select(word) {
    var oldWord = wordBeforeCursor();

    // Replace the current word with the selected suggestion plus space
    word += ' ';
    replaceBeforeCursor(oldWord, word);

    // Remember the change we just made so we can revert it if the
    // next key is a backspace. Note that it is not an autocorrection
    // so we don't need to disable corrections.
    revertFrom = word;
    revertTo = oldWord;
    justAutoCorrected = false;

    // We inserted a space after the selected word, so we're beginning
    // a new word here, which means that if auto-correction was disabled
    // we can re-enable it now.
    correctionDisabled = false;

    // Clear the suggestions
    keyboard.sendCandidates([]);

    // And update the keyboard capitalization state, if necessary
    updateCapitalization();
  }

  function setLayoutParams(params) {
    layoutParams = params;
    // XXX We call nearbyKeys() every time the keyboard pops up.
    // Maybe it would be better to compute it once in keyboard.js and
    // cache it.

    // We get called every time the keyboard case changes. Don't bother
    // passing this data to the prediction engine if nothing has changed.
    var newmap = nearbyKeys(params);
    var serialized = JSON.stringify(newmap);
    if (serialized === serializedNearbyKeyMap)
      return;

    nearbyKeyMap = newmap;
    serializedNearbyKeyMap = serialized;
    if (worker) {
      worker.postMessage({ cmd: 'setNearbyKeys', args: [nearbyKeyMap]});
      // Ask for new suggestions since the new layout may affect them.
      // (When switching from QWERTY to Dvorak, e.g.)
      updateSuggestions();
    }
  }

  function nearbyKeys(layout) {
    var nearbyKeys = {};
    var keys = layout.keyArray;
    var keysize = Math.min(layout.keyWidth, layout.keyHeight) * 1.2;
    var threshold = keysize * keysize;

    // Make sure that all the keycodes are lowercase, not uppercase
    for (var n = 0; n < keys.length; ++n) {
      keys[n].code =
        String.fromCharCode(keys[n].code).toLowerCase().charCodeAt(0);
    }

    // For each key, calculate the keys nearby.
    for (var n = 0; n < keys.length; ++n) {
      var key1 = keys[n];
      if (SpecialKey(key1))
        continue;
      var nearby = {};
      for (var m = 0; m < keys.length; ++m) {
        if (m === n)
          continue; // don't compare a key to itself
        var key2 = keys[m];
        if (SpecialKey(key2))
          continue;
        var d = distance(key1, key2);
        if (d !== 0)
          nearby[key2.code] = d;
      }
      nearbyKeys[key1.code] = nearby;
    }

    return nearbyKeys;

    // Compute the inverse square distance between the center point of
    // two keys, using the radius of the key (where radius is defined
    // as the distance from the center of key1 to a corner of key1)
    // as the unit of measure. If the distance is greater than 2.5
    // times the radius return 0 instead.
    function distance(key1, key2) {
      var cx1 = key1.x + key1.width / 2;
      var cy1 = key1.y + key1.height / 2;
      var cx2 = key2.x + key2.width / 2;
      var cy2 = key2.y + key2.height / 2;
      var radius = Math.sqrt(key1.width * key1.width / 4 +
                             key1.height * key1.height / 4);

      var dx = (cx1 - cx2) / radius;
      var dy = (cy1 - cy2) / radius;
      var distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < 1) {
        console.warn('Keys too close',
                     JSON.stringify(key1), JSON.stringify(key2));
        return 0;
      }

      if (distanceSquared > 2.5 * 2.5)
        return 0;
      else
        return 1 / distanceSquared;
    }

    // Determine whether the key is a special character or a regular letter.
    // Special characters include backspace (8), return (13), and space (32).
    function SpecialKey(key) {
      switch (key.code) {
      case 0:
      case KeyEvent.DOM_VK_BACK_SPACE:
      case KeyEvent.DOM_VK_CAPS_LOCK:
      case KeyEvent.DOM_VK_RETURN:
      case KeyEvent.DOM_VK_ALT:
      case KeyEvent.DOM_VK_SPACE:
        return true;
      default: // anything else is not special
        return false;
      }
    }
  }

  function updateSuggestions(repeat) {
    // If the user hasn't enabled suggestions, or if they're not appropriate
    // for this input type, or are turned off by the input mode, do nothing
    if (!suggesting && !correcting)
      return;

    // If we don't have a worker (probably because no dictionary) then
    // do nothing
    if (!worker)
      return;

    // If we deferred suggestions because of a key repeat, clear that timer
    if (suggestionsTimer) {
      clearTimeout(suggestionsTimer);
      suggestionsTimer = null;
    }

    // If we're still repeating, reset the repeat timer.
    if (repeat) {
      suggestionsTimer = setTimeout(updateSuggestions, autorepeatDelay);
      return;
    }

    // If we're not at the end of a word, we want to clear any suggestions
    // that might already be there
    if (!atWordEnd()) {
      if (suggesting)
        keyboard.sendCandidates([]);
      return;
    }

    var word = wordBeforeCursor();
    if (word) { // Defend against bug 879572 even though I can't reproduce it
      worker.postMessage({cmd: 'predict', args: [word]});
    }
  }

  function updateCapitalization() {
    // If either the input mode or the input type is one that doesn't
    // want capitalization, then don't alter the state of the keyboard.
    if (!capitalizing) {
      keyboard.resetUpperCase();
      return;
    }

    // Set the keyboard to uppercase or lowercase depending
    // on the text around the cursor:
    //
    // 1) If the cursor is at the start of the field: uppercase
    //
    // 2) If there are two uppercase chars before the cursor: uppercase
    //
    // 3) If there is a non space character immediately before the cursor:
    //    lowercase
    //
    // 4) If the first non-space character before the cursor is . ? or !:
    //    uppercase
    //
    // 5) Otherwise: lowercase
    //
    if (cursor === 0) {
      keyboard.setUpperCase(true);
    }
    else if (cursor >= 2 &&
             isUpperCase(inputText.substring(cursor - 2, cursor))) {
      keyboard.setUpperCase(true);
    }
    else if (!isWhiteSpace(inputText.substring(cursor - 1, cursor))) {
      keyboard.setUpperCase(false);
    }
    else if (atSentenceStart()) {
      keyboard.setUpperCase(true);
    }
    else {
      keyboard.setUpperCase(false);
    }
  }

  // Return true if all characters of s are uppercase. A character
  // is uppercase if toLowerCase() on that character is returns something
  // different than the character
  function isUpperCase(s) {
    var lc = s.toLowerCase();
    for (var i = 0, n = s.length; i < n; i++)
      if (s[i] === lc[i])
        return false;
    return true;
  }

  function isWhiteSpace(s) {
    return WS.test(s);
  }

  // We only offer suggestions if the cursor is at the end of a word
  // The character before the cursor must be a word character and
  // the cursor must be at the end of the input or the character after
  // must be whitespace.  If there is a selection we never return true.
  function atWordEnd() {
    // If there is a selection we never want suggestions
    if (selection)
      return false;

    // If we're not at the end of the line and the character after the
    // cursor is not whitespace, don't offer a suggestion
    // Note that we purposely use WS here, not WORDSEP.
    if (cursor < inputText.length && !WS.test(inputText[cursor]))
      return false;

    // If the cursor is at position 0 then we're not at the end of a word
    if (cursor <= 0)
      return false;

    // We're at the end of a word if the character before the cursor is
    // not a word separator character
    var c = inputText[cursor - 1];
    return !WORDSEP.test(c);
  }

  // Get the word before the cursor. Assumes that atWordEnd() is true
  function wordBeforeCursor() {
    for (var firstletter = cursor - 1; firstletter >= 0; firstletter--) {
      if (WORDSEP.test(inputText[firstletter])) {
        break;
      }
    }
    firstletter++;

    // firstletter is now the position of the start of the word and cursor is
    // the end of the word
    return inputText.substring(firstletter, cursor);
  }

  function atSentenceStart() {
    var i = cursor - 1;

    if (i === -1)    // This is the empty string case
      return true;

    // Verify that the position before the cursor is whitespace
    if (!isWhiteSpace(inputText[i--]))
      return false;
    // Now skip any additional whitespace before that
    while (i >= 0 && isWhiteSpace(inputText[i]))
      i--;

    if (i < 0)     // whitespace all the way back to the end of the string
      return true;

    var c = inputText[i];
    return c === '.' || c === '?' || c === '!';
  }
}());
