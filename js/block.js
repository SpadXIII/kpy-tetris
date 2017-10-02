var Block = function(type) {

  var x = 5;
  var y = 0;

  var shapes = BLOCK_SHAPES[type];
  var state = 0;
  var shape = shapes[state];

  var canvas = document.createElement('canvas');
  canvas.width = Images.block.width;
  canvas.height = Images.block.height;
  var context = canvas.getContext('2d');

  context.fillStyle = BLOCK_COLORS[type];
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "destination-atop";
  context.drawImage(Images.block, 0, 0);

  this.getPosition = function() {
    return {
      x: x,
      y: y
    }
  };

  this.place = function(newX, newY) {
    x = newX;
    y = newY;
  };

  this.moveLeft = function(grid) {
    x -= 1;
  };

  this.moveRight = function(grid) {
    x += 1;
  };

  this.moveDown = function(grid) {
    y += 1;
  };

  this.rotate = function(grid) {
    state = (state + 1) % shapes.length;
    shape = shapes[state];
  };

  this.drop = function(grid) {
    // @todo drop down completely
    y += 1;
  };

  this.draw = function(playfieldX, playfieldY) {
    for (var i = 0; i < shape.length; i++) {
      for (var j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          var bx = 40 * (x + j);
          var by = 40 * (y + i);
          gameContext.drawImage(canvas, bx + playfieldX, by + playfieldY);
        }
      }
    }
  };

};
