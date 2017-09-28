var Playfield = function(controlSchemeId, x) {

  var y = 100;
  var width = 400;
  var height = 600;

  var blocks = [];
  var grid = [];

  var dropSpeed = 0.08;

  var keys = controlSchemes[controlSchemeId]['keys'];

  var key_held = {
    left: false,
    right: false,
    rotate: false,
    drop: false,
    stash: false
  };

  var b = new Block(BLOCK_TYPE_I);
  b.place(5, 0);
  blocks.push(b);

  b = new Block(BLOCK_TYPE_S);
  b.place(5, 3);
  blocks.push(b);

  b = new Block(BLOCK_TYPE_T);
  b.place(5, 6);
  blocks.push(b);

  b = new Block(BLOCK_TYPE_O);
  b.place(1, 2);
  blocks.push(b);

  this.draw = function() {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].draw(x, y);
    }

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
    for (var i = blocks.length - 1; 0 <= i; i--) {
      blocks[i].update(delta, dropSpeed);
    }

    if (key_held['drop']) {
      b.drop(grid);
      key_held['drop'] = false;
    }
    if (key_held['rotate']) {
      b.rotate(grid);
      key_held['rotate'] = false;
    }
    if (key_held['left']) {
      b.moveLeft(grid);
      key_held['left'] = false;
    }
    if (key_held['right']) {
      b.moveRight(grid);
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
