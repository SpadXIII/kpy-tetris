var Playfield = function(controlSchemeId, x) {

  var y = 100;
  var width = 400;
  var height = 600;

  var grid = [];

  var intervalRemaining = TICK_INTERVAL;

  var keys = controlSchemes[controlSchemeId]['keys'];

  var key_held = {
    left: false,
    right: false,
    rotate: false,
    down: false,
    drop: false,
    stash: false
  };

  var currentBlock;

  initialize();

  function initialize() {
    currentBlock = randomBlock();

    for (var r = 0; r < FIELD_ROWS; r++) {
      grid[r] = [];
      for (var c = 0; c < FIELD_COLS; c++) {
        grid[r][c] = 0;
      }
    }
  }

  function randomBlock() {
    var i = random(0, BLOCK_TYPES.length - 1);

    return new Block(BLOCK_TYPES[i]);
  }

  function checkFullLines() {}
  function checkGameOver() {}

  this.draw = function() {
    drawStrokeRect(gameContext, x, y, width, height, '#fff', 2);

    currentBlock.draw(x, y);

    for (var r = 0; r < grid.length; r++) {
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== 0) {
          gameContext.drawImage(Images.block, 40 * c + x, 40 * r + y);
        }
      }
    }
  };

  this.update = function(delta) {
    intervalRemaining -= delta;
    if (intervalRemaining < 0) {
      intervalRemaining = TICK_INTERVAL;
      if (currentBlock.canGoDown(grid)) {
        currentBlock.moveDown(grid);
      }
      else {
        currentBlock.copyTo(grid);
        checkFullLines();
        checkGameOver();
        currentBlock = randomBlock();
      }
    }

    if (key_held['drop']) {
      currentBlock.drop(grid);
      key_held['drop'] = false;
    }
    if (key_held['down']) {
      currentBlock.moveDown(grid);
      key_held['down'] = false;
    }
    if (key_held['rotate']) {
      currentBlock.rotate(grid);
      key_held['rotate'] = false;
    }
    if (key_held['left']) {
      currentBlock.moveLeft(grid);
      key_held['left'] = false;
    }
    if (key_held['right']) {
      currentBlock.moveRight(grid);
      key_held['right'] = false;
    }
  };

  this.keyDown = function(event) {
    setKey(event, true);
  };

  this.keyUp = function(event) {
    setKey(event, false);
  };

  function setKey(event, set) {
    for (var k in key_held) {
      if (keys.hasOwnProperty(k) && event.keyCode === keys[k]) {
        key_held[k] = set;
        event.preventDefault();
      }
    }
  }

};
