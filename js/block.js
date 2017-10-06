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

  this.moveLeft = function(grid) {
    if (canMove(grid, 'left')) {
      x -= 1;
    }
  };

  this.moveRight = function(grid) {
    if (canMove(grid, 'right')) {
      x += 1;
    }
  };

  this.moveDown = function(grid) {
    if (this.canGoDown(grid)) {
      y += 1;
    }
  };

  this.drop = function(grid) {
    while (this.canGoDown(grid)) {
      y += 1;
    }
  };

  this.rotate = function(grid) {
    if (canMove(grid, 'rotate')) {
      state = nextState();
      shape = shapes[state];
    }
  };

  this.canGoDown = function(grid) {
    return canMove(grid, 'down');
  };

  this.copyTo = function(grid) {
    for (var r = 0; r < shape.length; r++) {
      for (var c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          grid[y + r][x + c] = shape[r][c];
        }
      }
    }
  };

  function nextState() {
    return (state + 1) % shapes.length;
  }

  this.draw = function(playfieldX, playfieldY) {
    for (var i = 0; i < shape.length; i++) {
      for (var j = 0; j < shape[i].length; j++) {
        if (shape[i][j] !== 0) {
          var bx = 40 * (x + j);
          var by = 40 * (y + i);
          gameContext.drawImage(canvas, bx + playfieldX, by + playfieldY);
        }
      }
    }
  };

  var allBoxes = [];
  function getBoxes(_state) {
    if (allBoxes[_state]) {
      return allBoxes[_state];
    }

    var boxes = [];

    var _shape = shapes[_state];
    for (var r = 0; r < _shape.length; r++) {
			for (var c = 0; c < _shape[r].length; c++) {
				if (_shape[r][c] !== 0) {
					boxes.push({x: c, y: r});
				}
			}
    }

    allBoxes[_state] = boxes;

    return boxes;
  }

  function canMove(grid, action) {
    var rows = grid.length;
    var cols = grid[0].length;

    var isBoxCanMove = function(box) {
      var boxX = x + box.x;
      var boxY = y + box.y;

      if (boxY < 0) {
        return true;
      }

      if (action === 'left') {
        boxX -= 1;
        return 0 <= boxX && boxX < cols && grid[boxY][boxX] === 0;
      }

      if (action === 'right') {
        boxX += 1;
        return 0 <= boxX && boxX < cols && grid[boxY][boxX] === 0;
      }

      if (action === 'down') {
        boxY += 1;
        return boxY < rows && grid[boxY][boxX] === 0;
      }

      if (action === 'rotate') {
        return boxY < rows && grid[boxY][boxX] === 0;
      }
    };

    var boxes = (action === 'rotate') ? getBoxes(nextState()) : getBoxes(state);

    for (var i = 0; i < boxes.length; i++) {
      if (!isBoxCanMove(boxes[i])) {
        return false;
      }
    }

    return true;
  }

};
