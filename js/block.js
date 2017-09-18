var Block = function(type, color) {

  var x,y;
  var width = 30;
  var height = 60;
  var angle = 0;

  var isDropping = false;

  this.place = function(newX, newY) {
    x = newX;
    y = newY;
  };

  this.moveLeft = function() {
    x -= width;
  };

  this.moveRight = function() {
    x += width;
  };

  this.rotate = function() {
    angle += Math.PI / 2;
    if (angle === Math.PI * 2) {
      angle = 0;
    }
  };

  this.drop = function() {
    isDropping = true;
  };

  this.draw = function() {
    drawFillRectRotated(gameContext, x, y, width, height, color, angle);
  };

  this.update = function(delta, dropSpeed) {
    if (isDropping) {
      y += dropSpeed * delta;
    }

    if (800 < y) {
      y = 150;
    }
  };

};
