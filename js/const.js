// Debug
const DEBUG = true;

const FIELD_COLS = 10;
const FIELD_ROWS = 20;

const KEY_ESC = 27;
const KEY_SPACE = 32;

const KEY_A = 65;
const KEY_D = 68;
const KEY_E = 69;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_O = 79;
const KEY_Q = 81;
const KEY_S = 83;
const KEY_W = 87;
const KEY_Z = 90;

const KEY_NUM_4 = 100;
const KEY_NUM_5 = 101;
const KEY_NUM_6 = 102;
const KEY_NUM_8 = 104;
const KEY_NUM_9 = 105;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_ENTER = 13;

const BLOCK_TYPE_I = 0;
const BLOCK_TYPE_J = 1;
const BLOCK_TYPE_L = 2;
const BLOCK_TYPE_O = 3;
const BLOCK_TYPE_S = 4;
const BLOCK_TYPE_T = 5;
const BLOCK_TYPE_Z = 6;
const BLOCK_COLORS = [
  '#f00', // I
  '#0f0', // J
  '#00f', // L
  '#ff0', // O
  '#0ff', // S
  '#f0f', // T
  '#fff'  // Z
];
const BLOCK_SHAPES = [
  // I
  [
    [
      [1,1,1,1]
    ],
    [
      [1],
      [1],
      [1],
      [1]
    ]
  ],
  // J
  [
    [
      [0,1],
      [0,1],
      [1,1]
    ]
  ],
  // L
  [
    [
      [1,0],
      [1,0],
      [1,1]
    ]
  ],
  // O
  [
    [
      [1,1],
      [1,1]
    ]
  ],
  // S
  [
    [
      [0,1,1],
      [1,1,0]
    ]
  ],
  // T
  [
    [
      [1,1,1],
      [0,1,0]
    ]
  ],
  // Z
  [
    [
      [1,1,0],
      [0,1,1]
    ]
  ]
];

// Preset control schemes with keys for: LEFT, RIGHT, ROTATE, DROP, STASH
var controlSchemes = [];
controlSchemes[0] = {
  label: 'WSADE (Qwerty)',
  keys: {
    left: KEY_A,
    right: KEY_D,
    rotate: KEY_W,
    drop: KEY_S,
    stash: KEY_E
  }
};

controlSchemes[1] = {
  label: 'ZSQDE (Azerty)',
  keys: {
    left: KEY_Q,
    right: KEY_D,
    rotate: KEY_Z,
    drop: KEY_S,
    stash: KEY_E
  }
};

controlSchemes[2] = {
  label: 'IKJLO',
  keys: {
    left: KEY_J,
    right: KEY_L,
    rotate: KEY_I,
    drop: KEY_K,
    stash: KEY_O
  }
};

controlSchemes[3] = {
  label: 'Arrows',
  keys: {
    left: KEY_LEFT_ARROW,
    right: KEY_RIGHT_ARROW,
    rotate: KEY_UP_ARROW,
    drop: KEY_DOWN_ARROW,
    stash: KEY_ENTER
  }
};

controlSchemes[4] = {
  label: 'Numpad (85469)',
  keys: {
    left: KEY_NUM_4,
    right: KEY_NUM_6,
    rotate: KEY_NUM_8,
    drop: KEY_NUM_5,
    stash: KEY_NUM_9
  }
};
