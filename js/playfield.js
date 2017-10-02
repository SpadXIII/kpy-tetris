var Playfield = function(controlSchemeId, x) {

  var y = 100;
  var width = 400;
  var height = 600;

  var blocks = [];
  var grid = [];

  var intervalRemaining = TICK_INTERVAL;

  var keys = controlSchemes[controlSchemeId]['keys'];

  var key_held = {
    left: false,
    right: false,
    rotate: false,
    drop: false,
    stash: false
  };

  var currentBlock = randomBlock();

  function randomBlock() {
    var i = random(0, BLOCK_TYPES.length);

    return new Block(BLOCK_TYPES[i]);
  }

  this.draw = function() {
    currentBlock.draw(x, y);

    // Debug
    drawStrokeRect(gameContext, x, y, width, height, '#fff', 2);
    for (var k in key_held) {
      if (keys.hasOwnProperty(k) && key_held[k]) {
        gameContext.fillStyle = '#fff';
        gameContext.fillText(k, x + 100, y + 100);
      }
    }
  };

  this.update = function(delta) {
    intervalRemaining -= delta;
    if (intervalRemaining < 0) {
      intervalRemaining = TICK_INTERVAL;
      currentBlock.moveDown(grid);

      // debug
      var pos = currentBlock.getPosition();
      if (FIELD_ROWS < pos.y) {
        currentBlock = randomBlock();
      }
    }

    if (key_held['drop']) {
      currentBlock.drop(grid);
      key_held['drop'] = false;
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
