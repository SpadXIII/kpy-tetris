// Debug
const DEBUG = true;

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

// Preset control schemes with keys for: LEFT, RIGHT, ROTATE, DROP, STASH
var controlSchemes = [];
controlSchemes[0] = {
  label: 'WSADE (Qwerty)',
  keys: [KEY_A, KEY_D, KEY_W, KEY_S, KEY_E]
};

controlSchemes[1] = {
  label: 'ZSQDE (Azerty)',
  keys: [KEY_Q, KEY_D, KEY_Z, KEY_S, KEY_E]
};

controlSchemes[2] = {
  label: 'IKJLO',
  keys: [KEY_J, KEY_L, KEY_I, KEY_K, KEY_O]
};

controlSchemes[3] = {
  label: 'Arrows',
  keys: [KEY_LEFT_ARROW, KEY_RIGHT_ARROW, KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_ENTER]
};

controlSchemes[4] = {
  label: 'Numpad (85469)',
  keys: [KEY_NUM_4, KEY_NUM_6, KEY_NUM_8, KEY_NUM_5, KEY_NUM_9]
};
