var Playfield = function(controlSchemeId, x) {

  var y = 100;
  var width = 330;
  var height = 600;

  var blocks = [];

  var keys = {
    left: controlSchemes[controlSchemeId]['keys'][0],
    right: controlSchemes[controlSchemeId]['keys'][1],
    rotate: controlSchemes[controlSchemeId]['keys'][2],
    drop: controlSchemes[controlSchemeId]['keys'][3],
    stash: controlSchemes[controlSchemeId]['keys'][4]
  };

  var key_held = {
    left: false,
    right: false,
    rotate: false,
    drop: false,
    stash: false
  };

  this.draw = function() {
    for (var i = 0; i < blocks.length; i--) {
      blocks[i].draw();
    }

    // Debug
    drawStrokeRect(gameContext, x, y, width, height, '#fff', 2);
    for (var k in keys) {
      if (keys.hasOwnProperty(k) && key_held[k]) {
        gameContext.fillStyle = '#fff';
        gameContext.fillText(k, x + 100, y + 100);
      }
    }
  };

  this.update = function(delta) {
    for (var i = blocks.length - 1; 0 <= i; i--) {
      blocks[i].update(delta);
    }
  };

  this.keyDown = function(event) {
    for (var k in keys) {
      if (keys.hasOwnProperty(k) && event.keyCode === keys[k]) {
        key_held[k] = true;
        event.preventDefault();
      }
    }
  };

  this.keyUp = function(event) {
    for (var k in keys) {
      if (keys.hasOwnProperty(k) && event.keyCode === keys[k]) {
        key_held[k] = false;
        event.preventDefault();
      }
    }
  };

};
