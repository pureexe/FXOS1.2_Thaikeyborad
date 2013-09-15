/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
'use strict';

const Keyboards = {
  alternateLayout: {
    alt: {
      '0': 'º',
      '$': '€ £ ¥ R$',
      '?': '¿',
      '!': '¡'
    },
    keys: [
      [
        { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
        { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
        { value: '9' }, { value: '0' }
      ], [
        { value: '@', hidden: ['email'] }, { value: '#' }, { value: '$' },
        { value: '%' },
        { value: '&' } , { value: '*' }, { value: '-' }, { value: '+' },
        { value: '(' }, { value: ')' }, { value: '_', visible: ['email']}
      ], [
        { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
        { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
        { value: ';' }, { value: '/' }, { value: '?' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  symbolLayout: {
    keys: [
      [
        { value: '`' }, { value: '~' }, { value: '_' }, { value: '^' },
        { value: '±' }, { value: '|' }, { value: '[' }, { value: ']' },
        { value: '{' }, { value: '}' }
      ], [
        { value: '°' }, { value: '²' }, { value: '³' }, { value: '©' },
        { value: '®' }, { value: '§' }, { value: '<' }, { value: '>' },
        { value: '«' }, { value: '»' }
      ],
      [
        { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
        { value: '¥' }, { value: '€' }, { value: '£' }, { value: '$' },
        { value: '¢' }, { value: '\\' }, { value: '=' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  numberLayout: {
    width: 9,
    keyClassName: 'big-key special-key',
    keys: [
      [{ value: '1', ratio: 3},{ value: '2', ratio: 3},{ value: '3', ratio: 3}],
      [{ value: '4', ratio: 3},{ value: '5', ratio: 3},{ value: '6', ratio: 3}],
      [{ value: '7', ratio: 3},{ value: '8', ratio: 3},{ value: '9', ratio: 3}],
      [
        { value: '.', ratio: 3, altNote: ','},
        { value: '0', ratio: 3, altNote: '-'},
        { value: '⌫', ratio: 3, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ]
    ],
    alt: {
      '.' : ',',
      '0' : '-'
    }
  },
  pinLayout: {
    width: 9,
    keyClassName: 'big-key special-key',
    keys: [
      [{ value: '1', ratio: 3},{ value: '2', ratio: 3},{ value: '3', ratio: 3}],
      [{ value: '4', ratio: 3},{ value: '5', ratio: 3},{ value: '6', ratio: 3}],
      [{ value: '7', ratio: 3},{ value: '8', ratio: 3},{ value: '9', ratio: 3}],
      [
        { value: '', ratio: 3},
        { value: '0', ratio: 3},
        { value: '⌫', ratio: 3, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ]
    ]
  },
  telLayout: {
    width: 9,
    keyClassName: 'big-key special-key',
    keys: [
      [{ value: '1', ratio: 3},{ value: '2', ratio: 3},{ value: '3', ratio: 3}],
      [{ value: '4', ratio: 3},{ value: '5', ratio: 3},{ value: '6', ratio: 3}],
      [{ value: '7', ratio: 3, altNote: '#'},
       { value: '8', ratio: 3, altNote: '-'},
       { value: '9', ratio: 3, altNote: '*'}],
      [{ value: '(', ratio: 3, altNote: ')'},
       { value: '0', ratio: 3, altNote: '+'},
       { value: '⌫', ratio: 3, keyCode: KeyEvent.DOM_VK_BACK_SPACE }]
    ],
    alt: {
      '7' : '#',
      '8' : '-',
      '9' : '*',
      '(' : ')',
      '0' : '+'
    }
  },
  en: {
    label: 'English',
    imEngine: 'latin',
    autoCorrectLanguage: 'en_us',
    menuLabel: 'English',
    alt: {
      a: 'áàâäåãāæ',
      c: 'çćč',
      e: 'éèêëēę€ɛ',
      i: 'ïíìîīį',
      o: 'öóòôōœøɵ',
      u: 'üúùûū',
      s: 'ßśš$',
      S: 'ŚŠ$',
      n: 'ñń',
      l: 'ł£',
      y: 'ÿ¥',
      z: 'žźż',
      r: 'R$ ',
      '.': ',?!;:'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' },
        { value: ':', visible: ['url']}, { value: '_', visible: ['email']}
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        '0': 'º',
        '1': '1st ',
        '2': '2nd ',
        '3': '3rd ',
        '4': '4th ',
        '5': '5th ',
        '6': '6th ',
        '7': '7th ',
        '8': '8th ',
        '9': '9th ',
        '$': '€ £ ¥ R$',
        '?': '¿',
        '!': '¡'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '@', hidden: ['email'] }, { value: '#' }, { value: '$' },
          { value: '%' }, { value: '&' } , { value: '*' }, { value: '-' },
          { value: '+' }, { value: '(' }, { value: ')' },
          { value: '_', visible: ['email'] }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
          { value: ';' }, { value: '/' }, { value: '?' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  es: {
    label: 'Spanish',
    menuLabel: 'Español',
    imEngine: 'latin',
    autoCorrectLanguage: 'es',
    alt: {
      a: 'áªàâäåãāæ',
      c: 'ç',
      e: 'é€èêëēęɛ',
      i: 'íïìîīį',
      o: 'óºöòôōœøɵ',
      u: 'üúùûū',
      s: '$ßš',
      l: '£ l·l',
      n: 'ń',
      y: '¥',
      r: 'R$ ',
      '.': ',¿?¡!;:·',
      ':)': ':) :D :( ;D :* :/'
//      '.com': '.es .org .eu' XXX: commented to avoid overflows for the demo
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: 'ñ', hidden: ['email', 'url'] },
        { value: ':', visible: ['url'] }, { value: '_', visible: ['email'] }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
//        { value: ':)', compositeKey:':)', ratio: 2 },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        '€': '$ £ ¥ R$',
        '0': 'º',
        '1': '1º 1ª',
        '2': '2º 2ª',
        '3': '3º 3ª',
        '4': '4º 4ª',
        '5': '5º 5ª',
        '6': '6º 6ª',
        '7': '7º 7ª',
        '8': '8º 8ª',
        '9': '9º 9ª',
        '.': '·'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '-' }, { value: '/' }, { value: ':' }, { value: ';' },
          { value: '(' } , { value: ')' }, { value: '€' }, { value: '&' },
          { value: '@', hidden: ['email'] }, { value: '%' },
          { value: '_', visible: ['email']}
        ], [
          { value: '#+=', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '¿' }, { value: '?' }, { value: '¡' }, { value: '!' },
          { value: '\"' }, { value: '\'' }, { value: '*' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    },
    symbolLayout: {
      keys: [
        [
          { value: '[' }, { value: ']' }, { value: '{' }, { value: '}' },
          { value: '#' }, { value: '%' }, { value: '^' }, { value: '+' },
          { value: '=' }, { value: '°' }
        ], [
          { value: '_' }, { value: '\\' }, { value: '|' }, { value: '~' },
          { value: '<' }, { value: '>' }, { value: '$' }, { value: '£' },
          { value: '¥' }, { value: '•' }
        ], [
          { value: '123', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '¿' }, { value: '?' }, { value: '¡' }, { value: '!' },
          { value: '\"' }, { value: '\'' }, {value: '*' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  'pt-BR': {
    label: 'Portuguese',
    menuLabel: 'Português',
    imEngine: 'latin',
    autoCorrectLanguage: 'pt_br',
    alt: {
      a: 'áãàâäåæª',
      e: 'éêèęėēëɛ',
      i: 'íîìïįī',
      o: 'óõôòöœøōɵ',
      u: 'úüùûū',
      s: '$ßš',
      l: '£',
      n: 'ñń',
      y: '¥ÿ',
      r: 'R$ ',
      '.': ',?!;:'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: 'ç', hidden: ['email', 'url'] },
        { value: ':', visible: ['url'] }, { value: '_', visible: ['email'] }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        'R$': '€$£¥',
        '0': 'º',
        '1': '1º 1ª',
        '2': '2º 2ª',
        '3': '3º 3ª',
        '4': '4º 4ª',
        '5': '5º 5ª',
        '6': '6º 6ª',
        '7': '7º 7ª',
        '8': '8º 8ª',
        '9': '9º 9ª',
        '?': '¿',
        '!': '¡'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '-' }, { value: '/' }, { value: ':' }, { value: ';' },
          { value: '(' } , { value: ')' },
          { value: 'R$', compositeKey: 'R$' }, { value: '&' },
          { value: '@', hidden: ['email'] },
          { value: '%' }, { value: '_', visible: ['email']}
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '?' }, {value: '!' }, { value: '«' }, { value: '»' },
          { value: '\"' }, { value: '\'' }, { value: '*' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    },
    symbolLayout: {
      keys: [
        [
          { value: '[' }, { value: ']' }, { value: '{' }, { value: '}' },
          { value: '#' }, { value: '%' }, { value: '^' }, { value: '+' },
          { value: '=' }, { value: '°' }
        ], [
          { value: '_' }, { value: '\\' }, { value: '|' }, { value: '~' },
          { value: '<' }, { value: '>' }, { value: '€' }, { value: '$' },
          { value: '£' }, { value: '•' }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '?' }, {value: '!' }, { value: '«' }, { value: '»' },
          { value: '\"' }, { value: '\'' }, { value: '*' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  cz: {
    label: 'Czech',
    menuLabel: 'Česká',
    imEngine: 'latin',
    autoCorrectLanguage: 'cs',
    alt: {
      a: 'á',
      c: 'č',
      d: 'ď',
      e: 'éě',
      i: 'í',
      n: 'ň',
      o: 'ó',
      r: 'ř',
      s: 'š',
      t: 'ť',
      u: 'úů',
      y: 'ý',
      z: 'ž'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' }, { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: "'", keyCode: 39 }
      ], [
        { value: '&#8682;', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '&#9003;', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '&#8629;', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  fr: {
    label: 'French',
    menuLabel: 'Français',
    imEngine: 'latin',
    autoCorrectLanguage: 'fr',
    alt: {
      a: 'àâæáãäåā',
      c: 'çćč',
      e: 'éèêë€ē',
      i: 'îïìíī',
      o: 'ôœòóõöōø',
      u: 'ùûüúū',
      s: 'śšşß',
      S: 'ŚŠŞ',
      n: 'ńñň',
      '.': ',?!-;:'
    },
    keys: [
      [
        { value: 'a' }, { value: 'z' }, { value: 'e' }, { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' }, { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'q' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: 'm' }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'w' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: "'", keyCode: 39 },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  de: {
    label: 'German',
    menuLabel: 'Deutsch',
    imEngine: 'latin',
    autoCorrectLanguage: 'de',
    alt: {
      a: 'äàáâãåāæ',
      c: 'çćč',
      e: 'èéêëē€',
      i: 'ìíîïī',
      o: 'öòóôõōœø',
      u: 'üùúûū',
      s: 'ßśšş',
      S: 'ŚŠŞ',
      n: 'ńñň'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' }, { value: 'r' },
        { value: 't' } , { value: 'z' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: "'", keyCode: 39 }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'y' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
 he:  {
    label: 'Thai',
    menuLabel: 'ไทย',
    width: 11,
    alt: {
      'ๆ': '฿',
      'ภ': '1',
      'ถ': '2',
      'ุ': '3',
      'ู': '4',
      'ึ': '5',
      'ค': '6',
      'ต': '7',
      'จ': '8',
      'ข': '9',
      'ช': '0',
      'ไ': 'ๆ',
      'ำ': 'ฎ',
      'พ': 'ฑ',
      'ะ': 'ธ',
      'ั': 'ํ',
      'ี': '๊',
      'ร': 'ณ',
      'น': 'ฯ',
      'ย': 'ญ',
      'บ': 'ฐ',
      'ล': 'ฅ',
      'ฟ': 'ฤ',
      'ห': 'ฆ',
      'ก': 'ฏ',
      'ด': 'โ',
      'เ': 'ฌ',
      '้': '็',
      '่': '๋',
      'า': 'ษ',
      'ส': 'ศ',
      'ว': 'ซ',
      'ง': 'ข',
      'ป': 'ผ',
      'แ': 'ฉ',
      'อ': 'ฮ',
      'ิ': 'ฺ',
      'ื': '์',
      'ท': '?',
      'ม': 'ฒ',
      'ใ': 'ฬ',
      'ฝ': 'ฦ',
      '.': ':;"\'-,!?'
    },
    upperCase: {
      'ๆ': '฿',
      'ภ': '1',
      'ถ': '2',
      'ุ': '3',
      'ู': '4',
      'ึ': '5',
      'ค': '6',
      'ต': '7',
      'จ': '8',
      'ข': '9',
      'ช': '0',
      'ไ': 'ๆ',
      'ำ': 'ฎ',
      'พ': 'ฑ',
      'ะ': 'ธ',
      'ั': 'ํ',
      'ี': '๊',
      'ร': 'ณ',
      'น': 'ฯ',
      'ย': 'ญ',
      'บ': 'ฐ',
      'ล': 'ฅ',
      'ฟ': 'ฤ',
      'ห': 'ฆ',
      'ก': 'ฏ',
      'ด': 'โ',
      'เ': 'ฌ',
      '้': '็',
      '่': '๋',
      'า': 'ษ',
      'ส': 'ศ',
      'ว': 'ซ',
      'ง': 'ข',
      'ป': ')',
      'แ': 'ฉ',
      'อ': 'ฮ',
      'ิ': 'ฺ',
      'ื': '์',
      'ท': '?',
      'ม': 'ฒ',
      'ใ': 'ฬ',
      'ฝ': 'ฦ',
      'ผ': '('
    },
    keys: [
      [
        { value: 'ๆ' }, { value: 'ภ' }, { value: 'ถ' }, { value: 'ุ' },
        { value: 'ู' } , { value: 'ึ' }, { value: 'ค' } , { value: 'ต' },
        { value: 'จ' }, { value: 'ข' }, { value: 'ช' }
      ], [
        { value: 'ไ' }, { value: 'ำ' }, { value: 'พ' }, { value: 'ะ' },
        { value: 'ั' } , { value: 'ี' }, { value: 'ร' }, { value: 'น' },
        { value: 'ย' }, { value: 'บ' }, { value: 'ล' }
      ], [
        { value: 'ฟ' }, { value: 'ห' }, { value: 'ก' }, { value: 'ด' },
        { value: 'เ' } , { value: '้' }, { value: '่' }, { value: 'า' },
        { value: 'ส' }, { value: 'ว' }, { value: 'ง' }
      ], [
        { value: '⇪', keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'ป' }, { value: 'แ' }, { value: 'อ' }, { value: 'ิ' },
        { value: 'ื' }, { value: 'ท' }, { value: 'ม' },
        { value: 'ใ' }, { value: 'ฝ' },
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      basicLayoutKey: 'กขค',
      alt: {
        '0': 'º',
        '$': '฿ € £ ¥ R$',
        '?': '¿',
        '!': '¡'
      },
      keys: [
        [
          { value: '๑' }, { value: '๒' }, { value: '๓' } , { value: '๔' },
          { value: '๕' } , { value: '๖' }, { value: '๗' } , { value: '๘' },
          { value: '๙' }, { value: '๐' }
        ], [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '@' }, { value: '#' }, { value: '$' }, { value: '%' },
          { value: '&' } , { value: '*' }, { value: '-' }, { value: '+' },
          { value: '(' }, { value: ')' }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
          { value: ';' }, { value: '/' }, { value: '?' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  nb: {
    label: 'Norwegian Bokmal',
    menuLabel: 'Norsk',
    imEngine: 'latin',
    alt: {
      a: 'äáàâąã',
      e: 'éèêëę€',
      i: 'íìîï',
      o: 'öóòôõ',
      u: 'üúùûū',
      s: 'śšşß',
      S: 'ŚŠŞ',
      n: 'ńñň',
      c: 'çćč',
      d: 'ðď',
      r: 'ř',
      t: 'ťþ',
      z: 'źžż',
      l: 'ł',
      v: 'w',
      'æ': 'œ'
    },
    width: 11,
    keys: [
      [
        { value: 'q' },{ value: 'w' },{ value: 'e' },{ value: 'r' },
        { value: 't' },{ value: 'y' },{ value: 'u' },{ value: 'i' },
        { value: 'o' },{ value: 'p' },{ value: 'å' }
      ], [
        { value: 'a' },{ value: 's' },{ value: 'd' },{ value: 'f' },
        { value: 'g' },{ value: 'h' },{ value: 'j' },{ value: 'k' },
        { value: 'l' },{ value: 'ø' },{ value: 'æ' }
      ], [
        { value: '⇪', ratio: 2, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' },{ value: 'x' },{ value: 'c' },{ value: 'v' },
        { value: 'b' },{ value: 'n' },{ value: 'm' },
        { value: '⌫', ratio: 2, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  ro: {
    label: 'Romanian',
    menuLabel: 'Română',
    imEngine: 'latin',
    autoCorrectLanguage: 'ro',
    alt: {
      a: 'ăâ',
      d: 'đ',
      e: '€',
      i: 'î',
      l: 'ł',
      s: 'ș',
      t: 'ț',
      '.': ',?!;:'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' },
        { value: ':', visible: ['url']}, { value: '_', visible: ['email']}
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        '0': 'º',
        '$': '€£¥',
        '?': '¿',
        '!': '¡',
        '\"': '„”'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '@', hidden: ['email'] }, { value: '#' }, { value: '$' },
          { value: '%' }, { value: '&' } , { value: '*' }, { value: '-' },
          { value: '+' }, { value: '(' }, { value: ')' },
          { value: '_', visible: ['email'] }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
          { value: ';' }, { value: '/' }, { value: '?' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  ru: {
    label: 'Russian',
    menuLabel: 'Pусский',
    imEngine: 'latin',
    autoCorrectLanguage: 'ru',
    alt: {
      е: 'ё',
      ь: 'ъ'
    },
    width: 11,
    keys: [
        [
          { value: 'й' }, { value: 'ц' }, { value: 'у' }, { value: 'к' },
          { value: 'е' }, { value: 'н' }, { value: 'г' }, { value: 'ш' },
          { value: 'щ' }, { value: 'з' }, { value: 'х' }
        ], [
          { value: 'ф' }, { value: 'ы' }, { value: 'в' }, { value: 'а' },
          { value: 'п' }, { value: 'р' }, { value: 'о' }, { value: 'л' },
          { value: 'д' }, { value: 'ж' }, { value: 'э' }
        ], [
          { value: '⇪', keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
          { value: 'я' }, { value: 'ч' }, { value: 'с' }, { value: 'м' },
          { value: 'и' }, { value: 'т' }, { value: 'ь' }, { value: 'б' },
          { value: 'ю' }, { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
    ]
  },
  'sr-Cyrl': {
    label: 'Serbian (Cyrillic)',
    menuLabel: 'Српски (ћирилица)',
    imEngine: 'latin',
    autoCorrectLanguage: 'sr-Cyrl',
    alt: {
      // incomplete
    },
    width: 11,
    keys: [
      [
        { value: 'љ' }, { value: 'њ' }, { value: 'е' }, { value: 'р' },
        { value: 'т' }, { value: 'з' }, { value: 'у' }, { value: 'и' },
        { value: 'о' }, { value: 'п' }, { value: 'ш' }
      ], [
        { value: 'а' }, { value: 'с' }, { value: 'д' }, { value: 'ф' },
        { value: 'г' }, { value: 'х' }, { value: 'ј' }, { value: 'к' },
        { value: 'л' }, { value: 'ч' }, { value: 'ћ' }
      ], [
        { value: '⇪', keyCode: KeyEvent.DOM_VK_CAPS_LOCK }, { value: 's' },
        { value: 'џ' }, { value: 'ц' }, { value: 'в' }, { value: 'б' },
        { value: 'н' }, { value: 'м' }, { value: 'ђ' }, { value: 'ж' },
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'sr-Latn': {
    label: 'Serbian (Latin)',
    menuLabel: 'Srpski',
    imEngine: 'latin',
    autoCorrectLanguage: 'sr-Latn',
    alt: {
      c: 'čć',
      d: 'đ',
      s: 'š',
      z: 'ž',
      '.': ',?!;:'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: '"', hidden: ['email', 'url'] },
        { value: ':', visible: ['url']}, { value: '_', visible: ['email']}
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        '0': 'º',
        '$': '€£¥',
        '?': '¿',
        '!': '¡'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '@', hidden: ['email'] }, { value: '#' }, { value: '$' },
          { value: '%' }, { value: '&' } , { value: '*' }, { value: '-' },
          { value: '+' }, { value: '(' }, { value: ')' },
          { value: '_', visible: ['email'] }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
          { value: ';' }, { value: '/' }, { value: '?' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  sk: {
    label: 'Slovak',
    imEngine: 'latin',
    autoCorrectLanguage: 'sk',
    menuLabel: 'Slovenčina',
    alt: {
      a: 'áàâąãäæ',
      e: 'éèêëę€',
      o: 'óòôõöøœ',
      s: 'śšşß',
      S: 'ŚŠŞ',
      n: 'ńñň',
      c: 'çćč',
      y: 'ýÿü',
      d: 'ðď',
      r: 'ř',
      t: 'ťþ',
      z: 'źžż',
      l: 'ł'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: "'", keyCode: 39 }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'tr-Q': {
    label: 'Turkish Q',
    imEngine: 'latin',
    autoCorrectLanguage: 'tr',
    menuLabel: 'Türkçe Q',
    upperCase: {
      'i': 'İ'
    },
    alt: {
      a: 'â',
      c: 'çćč',
      g: 'ğ',
      i: 'īįıìíîï',
      'İ': 'ĪĮIÌÍÎÏ',
      s: 'śšşß',
      S: 'ŚŠŞ',
      o: 'òóôõöōœø',
      u: 'ùúûüū'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: "'", keyCode: 39 }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'tr-F': {
    label: 'Turkish F',
    imEngine: 'latin',
    autoCorrectLanguage: 'tr',
    menuLabel: 'Türkçe F',
    upperCase: {
      'i': 'İ'
    },
    alt: {
      d: '¥',
      i: 'ß',
      f: '@',
      j: '«',
      ö: '»',
      p: '£',
      s: 'μ',
      v: '¢',
      u: 'æ',
      '.': ',?!;:'
    },
    width: 12,
    keys: [
      [
        { value: 'f' }, { value: 'g' }, { value: 'ğ' }, { value: 'ı' },
        { value: 'o' }, { value: 'd' }, { value: 'r' }, { value: 'n' },
        { value: 'h' }, { value: 'p' }, { value: 'q' }, { value: 'w' }
      ], [
        { value: 'u' }, { value: 'i' }, { value: 'e' }, { value: 'a' },
        { value: 'ü' }, { value: 't' }, { value: 'k' }, { value: 'm' },
        { value: 'l' }, { value: 'y' }, { value: 'ş' }, { value: 'x' }
      ], [
        { value: '⇪', ratio: 2, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'j' }, { value: 'ö' }, { value: 'v' }, { value: 'c' },
        { value: 'ç' }, { value: 'z' }, { value: 's' }, { value: 'b'},
        { value: '⌫', ratio: 2, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9.5, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2.5, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'en-Dvorak': {
    label: 'English - Dvorak',
    menuLabel: 'Dvorak',
    imEngine: 'latin',
    autoCorrectLanguage: 'en_us',
    alt: {
      a: 'àáâãäåāæ',
      c: 'çćč',
      e: 'èéêëē€',
      i: 'ìíîïī',
      o: 'òóôõöōœø',
      u: 'ùúûüū',
      s: 'śšşß',
      S: 'ŚŠŞ',
      n: 'ńñň'
    },
    textLayoutOverwrite: {
      ',': "'",
      '.': false
    },
    keys: [
      [
        { value: ',' }, { value: '.' } , { value: 'p' }, { value: 'y' },
        { value: 'f' }, { value: 'g' } , { value: 'c' }, { value: 'r' },
        { value: 'l' }, { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: 'a' }, { value: 'o' }, { value: 'e' }, { value: 'u' },
        { value: 'i' } , { value: 'd' }, { value: 'h' }, { value: 't' },
        { value: 'n' }, { value: 's' }
      ], [
        { value: '⇪', ratio: 1, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'q' }, { value: 'j' }, { value: 'k' }, { value: 'x' },
        { value: 'b' }, { value: 'm' }, { value: 'w' }, { value: 'v' },
        { value: 'z' }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'zh-Hant-Zhuyin': {
    label: 'Chinese - Traditional - Zhuyin',
    menuLabel: '繁體注音輸入',
    needsCandidatePanel: true,
    imEngine: 'jszhuyin',
    width: 11,
    textLayoutOverwrite: {
      ',': '，',
      '.': '。'
    },
    keys: [
      [
        { value: 'ㄅ'},{ value: 'ㄉ'},{ value: 'ˇ'},{ value: 'ˋ'},
        { value: 'ㄓ'},{ value: 'ˊ'},{ value: '˙'},{ value: 'ㄚ'},
        { value: 'ㄞ'},{ value: 'ㄢ'}, { value: 'ㄦ'}
      ], [
        { value: 'ㄆ'},{ value: 'ㄊ'},{ value: 'ㄍ'},{ value: 'ㄐ'},
        { value: 'ㄔ'},{ value: 'ㄗ'},{ value: 'ㄧ'},{ value: 'ㄛ'},
        { value: 'ㄟ'},{ value: 'ㄣ'}, { value: '？'}
      ], [
        { value: 'ㄇ'},{ value: 'ㄋ'},{ value: 'ㄎ'},{ value: 'ㄑ'},
        { value: 'ㄕ'},{ value: 'ㄘ'},{ value: 'ㄨ'},{ value: 'ㄜ'},
        { value: 'ㄠ'},{ value: 'ㄤ'}, { value: '…'}
      ], [
        { value: 'ㄈ'},{ value: 'ㄌ'},{ value: 'ㄏ'},{ value: 'ㄒ'},
        { value: 'ㄖ'},{ value: 'ㄙ'},{ value: 'ㄩ'},{ value: 'ㄝ'},
        { value: 'ㄡ'},{ value: 'ㄥ'},
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'zh-Hans-Pinyin': {
    label: 'Chinese - Simplified - Pinyin',
    menuLabel: '拼音输入',
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    imEngine: 'jspinyin',
    width: 10,
    textLayoutOverwrite: {
      ',': false,
      '.': false
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: "'" }
      ], [
        { value: '，', ratio: 1.5 }, { value: 'z' },
        { value: 'x' }, { value: 'c' }, { value: 'v' }, { value: 'b' },
        { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '?123', keyCode: -14, ratio: 1.5 },
        { value: '&nbsp', keyCode: KeyEvent.DOM_VK_SPACE, ratio: 5 },
        { value: '。', ratio: 1.5 },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'zh-Hans-Pinyin-Symbol': {
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    width: 10,
    textLayoutOverwrite: {
      ',': false,
      '.': false
    },
    keys: [
      [
        { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
        { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
        { value: '9' }, { value: '0' }
      ], [
        { value: '@', hidden: ['email'] }, { value: '#' }, { value: '$' },
        { value: '%' },
        { value: '&' } , { value: '*' }, { value: '-' }, { value: '+' },
        { value: '(' }, { value: ')' }, { value: '_', visible: ['email']}
      ], [
        { value: '半', ratio: 1.5, keyCode: -13 },
        { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
        { value: ';' }, { value: '/' }, { value: '?' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '拼', keyCode: -11, ratio: 1.5 },
        { value: '&nbsp', ratio: 5, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '.', ratio: 1.5 },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'zh-Hans-Pinyin-Symbol-Full': {
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    width: 10,
    textLayoutOverwrite: {
      ',': false,
      '.': false
    },
    keys: [
      [
        { value: '１' }, { value: '２' }, { value: '３' } , { value: '４' },
        { value: '５' } , { value: '６' }, { value: '７' } , { value: '８' },
        { value: '９' }, { value: '０' }
      ], [
        { value: '～' }, { value: '－' }, { value: '、' }, { value: '，' },
        { value: '【' }, { value: '】' }, { value: '《' }, { value: '》' },
        { value: '（' }, { value: '）' }
      ], [
        { value: '全', ratio: 1.5, keyCode: -12 },
        { value: '！' }, { value: '“' }, { value: '”' }, { value: '：' },
        { value: '；' }, { value: '…' }, { value: '？' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '拼', keyCode: -11, ratio: 1.5 },
        { value: '&nbsp', ratio: 5, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '。', ratio: 1.5 },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  ar: {
    label: 'Arabic',
    menuLabel: 'العربية',
    alternateLayoutKey: '123',
    basicLayoutKey: 'أ ب ج',
    width: 11,
    keys: [
      [
        { value: 'ض' }, { value: 'ص' }, { value: 'ث' }, { value: 'ق' },
        { value: 'ف' }, { value: 'غ' } , { value: 'ع' }, { value: 'ه' },
        { value: 'خ' }, { value: 'ح' }, { value: 'ج' }
      ], [
        { value: 'ش' }, { value: 'س' }, { value: 'ي' }, { value: 'ب' },
        { value: 'ل' } , { value: 'ا' }, { value: 'ت' }, { value: 'ن' },
        { value: 'م' }, { value: 'ك' }, { value: 'ة' }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'ء' }, { value: 'ظ' }, { value: 'ط' }, { value: 'ذ' },
        { value: 'د' }, { value: 'ز' }, { value: 'ر' }, { value: 'و' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    upperCase: {
      ض: 'َ',
      ص: 'ً',
      ث: 'ُ',
      ق: 'ٌ',
      ف: 'ْ',
      غ: 'ّ',
      ع: 'ِ',
      ه: 'ٍ',
      خ: '’',
      ح: ',',
      ج: '؛',
      ش: '\\',
      س: ']',
      ي: '[',
      ب: 'ـ',
      ل: 'إ',
      ا: 'أ',
      ت: 'آ',
      ن: '،',
      م: '/',
      ك: ':',
      ة: '\"',
      ء: 'ئ',
      ظ: 'ؤ',
      ط: '؟',
      ذ: '=',
      د: '-',
      ز: '×',
      ر: '÷',
      و: '+'
    },
    textLayoutOverwrite: {
      ',': '،'
    },
    alternateLayoutOverwrite: {
      '?': '؟'
    }
  },
  el: {
    label: 'Greek',
    menuLabel: 'Greek',
    imEngine: 'latin',
    autoCorrectLanguage: 'el',
    alt: {
      α: 'ά',
      ε: 'έ€',
      ω: 'ώ',
      ο: 'ό',
      Υ: 'ΎΫ',
      υ: 'ύϋΰ',
      Ι: 'ΊΪ',
      ι: 'ίϊΐ',
      η: 'ή',
      σ: 'ς'
    },
    keys: [
      [
        { value: ';' }, { value: 'ς' }, { value: 'ε' } , { value: 'ρ' },
        { value: 'τ' } , { value: 'υ' }, { value: 'θ' } , { value: 'ι' },
        { value: 'ο' }, { value: 'π' }
      ], [
        { value: 'α' }, { value: 'σ' }, { value: 'δ' }, { value: 'φ' },
        { value: 'γ' } , { value: 'η' }, { value: 'ξ' }, { value: 'κ' },
        { value: 'λ' }, { value: "'", keyCode: 39 }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'ζ' }, { value: 'χ' }, { value: 'ψ' }, { value: 'ω' },
        { value: 'β' }, { value: 'ν' }, { value: 'μ' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  pl: {
    label: 'Polish',
    imEngine: 'latin',
    autoCorrectLanguage: 'pl',
    menuLabel: 'Polski',
    alt: {
      a: 'ąáàâäåãāæ',
      c: 'ćčç',
      e: 'ę€éèêëē',
      i: 'ïíìîīį',
      o: 'óöòôōœø',
      u: 'üúùûū',
      s: 'śš$ß',
      S: 'ŚŠŞ',
      n: 'ńñ',
      l: 'ł£',
      y: '¥',
      z: 'żźž',
      '.': '?!…,',
      ',': '„”',
      ':': ';-—'
    },
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: ':', hidden: ['email'] },
        { value: '_', visible: ['email'] }
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        '$': '€£¥',
        '?': '¿',
        '!': '¡'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '@', hidden: ['email'] }, { value: '#' }, { value: '$' },
          { value: '%' }, { value: '&' } , { value: '*' }, { value: '-' },
          { value: '+' }, { value: '(' }, { value: ')' },
          { value: '_', visible: ['email'] }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
          { value: ';' }, { value: '/' }, { value: '?' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  },
  'jp-kanji': {
    label: 'Japanese - Kanji',
    menuLabel: 'Japanese - Kanji',
    imEngine: 'jskanji',
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    hidesSwitchKey: true,
    width: 10,
    keys: [
      [
        { value: '戻す', keyCode: -10, ratio: 2 },
        { value: 'あ', ratio: 2 },
        { value: 'か', ratio: 2 },
        { value: 'さ', ratio: 2 },
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE, ratio: 2 }
      ], [
        { value: '←', keyCode: -11, ratio: 2 },
        { value: 'た', ratio: 2 },
        { value: 'な', ratio: 2 },
        { value: 'は', ratio: 2 },
        { value: '→', keyCode: -12, ratio: 2 }
      ], [
        { value: '記号', keyCode: -13, ratio: 1 },
        { value: 'カナ', keyCode: -18, ratio: 1 },
        { value: 'ま', ratio: 2 },
        { value: 'や', ratio: 2 },
        { value: 'ら', ratio: 2 },
        { value: '└─┘', keyCode: -14, ratio: 2 }
      ], [
        { value: '&#x1f310;', keyCode: -3},
        { value: 'あ', keyCode: -20 },
        { value: '大小', keyCode: -16, ratio: 2 },
        { value: 'わ', ratio: 2 },
        { value: '、', ratio: 2},
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  'jp-kanji-en': {
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    hidesSwitchKey: true,
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }
      ], [
        { value: '⇪', keyCode: -19 }, { value: 'a' }, { value: 's' },
        { value: 'd' }, { value: 'f' }, { value: 'g' }, { value: 'h' },
        { value: 'j' }, { value: 'k' }, { value: 'l' }
      ], [
        { value: '記号', keyCode: -13, ratio: 1.5 },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&#x1f310;', keyCode: -3}, { value: 'A', keyCode: -21 },
        { value: '&nbsp', keyCode: KeyEvent.DOM_VK_SPACE, ratio: 6},
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]

  },
  'jp-kanji-en-caps': {
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    hidesSwitchKey: true,
    keys: [
      [
        { value: 'Q' }, { value: 'W' }, { value: 'E' } , { value: 'R' },
        { value: 'T' } , { value: 'Y' }, { value: 'U' } , { value: 'I' },
        { value: 'O' }, { value: 'P' }
      ], [
        { value: '⇪', keyCode: -19 }, { value: 'A' }, { value: 'S' },
        { value: 'D' }, { value: 'F' }, { value: 'G' }, { value: 'H' },
        { value: 'J' }, { value: 'K' }, { value: 'L' }
      ], [
        { value: '記号', keyCode: -13, ratio: 1.5 },
        { value: 'Z' }, { value: 'X' }, { value: 'C' }, { value: 'V' },
        { value: 'B' }, { value: 'N' }, { value: 'M' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&#x1f310;', keyCode: -3}, { value: 'A', keyCode: -21 },
        { value: '&nbsp', keyCode: KeyEvent.DOM_VK_SPACE, ratio: 6},
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },

  'jp-kanji-number': {
    needsCandidatePanel: true,
    disableAlternateLayout: true,
    hidesSwitchKey: true,
    typeInsensitive: true,
    keys: [
      [
        { value: '戻す', keyCode: -10, ratio: 2 },
        { value: '1', ratio: 2 }, { value: '2', ratio: 2 },
        { value: '3', ratio: 2 },
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE, ratio: 2 }
      ], [
        { value: '←', keyCode: -11, ratio: 2 }, { value: '4', ratio: 2 },
        { value: '5', ratio: 2 }, { value: '6', ratio: 2 },
        { value: '→', keyCode: -12, ratio: 2 }
      ], [
        { value: '記号', keyCode: -13, ratio: 2 },
        { value: '7', ratio: 2 }, { value: '8', ratio: 2 },
        { value: '9', ratio: 2 }, { value: '└─┘', keyCode: -14, ratio: 2 }
      ], [
        { value: '&#x1f310;', keyCode: -3},
        { value: '1', keyCode: -22, ratio: 1 }, { value: '*', ratio: 2 },
        { value: '0', ratio: 2 }, { value: '#', ratio: 2},
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  ca: {
    label: 'Catalan',
    menuLabel: 'Català',
    imEngine: 'latin',
    autoCorrectLanguage: 'ca',
    alt: {
      a: 'àáâäåãāæª@',
      c: 'çćč',
      e: 'èéêëēę€ɛ',
      i: 'íïìîīį',
      o: 'òóöôōœøɵº',
      u: 'úüùûū',
      s: 'ßśš$',
      S: 'ŚŠŞ',
      n: 'ñń',
      l: 'l·l ł £',
      y: 'ÿ¥',
      z: 'žźż',
      r: 'R$ ',
      '?': '!¿¡',
      '.': ',;:·…',
      "'": '"«»',
      '-': '—_'
    },
    width: 11,
    keys: [
      [
        { value: 'q' }, { value: 'w' }, { value: 'e' } , { value: 'r' },
        { value: 't' } , { value: 'y' }, { value: 'u' } , { value: 'i' },
        { value: 'o' }, { value: 'p' }, { value: '?' }
      ], [
        { value: 'a' }, { value: 's' }, { value: 'd' }, { value: 'f' },
        { value: 'g' } , { value: 'h' }, { value: 'j' }, { value: 'k' },
        { value: 'l' }, { value: 'ç' },
        { value: "'", keyCode: 39, hidden: ['email', 'url'] },
        { value: ':', visible: ['url']}, { value: '_', visible: ['email']}
      ], [
        { value: '⇪', ratio: 1.5, keyCode: KeyEvent.DOM_VK_CAPS_LOCK },
        { value: 'z' }, { value: 'x' }, { value: 'c' }, { value: 'v' },
        { value: 'b' }, { value: 'n' }, { value: 'm' }, { value: '-' },
        { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        { value: '&nbsp', ratio: 9, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ],
    alternateLayout: {
      alt: {
        '0': 'º',
        '1': '1r 1a',
        '2': '2n 2a',
        '3': '3r 3a',
        '4': '4t 4a',
        '5': '5è 5a 5é',
        '6': '6è 6a 6é',
        '7': '7è 7a 7é',
        '8': '8è 8a 8é',
        '9': '9è 9a 9é',
        '€': '$ £ ¥ R$',
        '-': '—_',
        '?': '¿',
        '"': '«»',
        '.': ',;:·…',
        '!': '¡'
      },
      keys: [
        [
          { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
          { value: '5' } , { value: '6' }, { value: '7' } , { value: '8' },
          { value: '9' }, { value: '0' }
        ], [
          { value: '@', hidden: ['email'] }, { value: '#' }, { value: '€' },
          { value: '%' }, { value: '&' } , { value: '*' }, { value: '-' },
          { value: '+' }, { value: '(' }, { value: ')' },
          { value: '_', visible: ['email'] }
        ], [
          { value: 'ALT', ratio: 1.5, keyCode: KeyEvent.DOM_VK_ALT },
          { value: '!' }, { value: '\"' }, { value: "'" }, { value: ':' },
          { value: ';' }, { value: '/' }, { value: '?' },
          { value: '⌫', ratio: 1.5, keyCode: KeyEvent.DOM_VK_BACK_SPACE }
        ], [
          { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
          { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
        ]
      ]
    }
  }
};