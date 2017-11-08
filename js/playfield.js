var Playfield = function(controlSchemeId, x, side) {

  var y = 100;
  var other;

  var grid = [];

  var interval = TICK_INTERVAL;
  var intervalRemaining = interval;
  var intervalMultiplier = 1;

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
  var nextBlock;

  var lost = false;

  var numCleared = 0;
  var numInsertedRows = 0;

  var powerUps = [];

  initialize();

  this.setInterval = function(_interval) {
    interval = _interval;
  };

  this.setIntervalMultiplier = function(_intervalMultiplier) {
    if (0 < _intervalMultiplier) {
      intervalMultiplier = _intervalMultiplier;
    }
  };

  this.unsetIntervalMultiplier = function() {
    intervalMultiplier = 1;
  };

  function initialize() {
    nextBlock = randomBlock();
    setNextBlock();
    powerUps = [];

    for (var r = 0; r < FIELD_ROWS; r++) {
      grid[r] = [];
      for (var c = 0; c < FIELD_COLS; c++) {
        grid[r][c] = 0;
      }
    }
  }

  this.setOther = function(_other) {
    other = _other;
  };

  this.createHoles = function() {
    var holes = [];
    var r, c;
    var num = random(5, 10);

    var topRow = grid.length - 1;
    for (r = topRow; 0 <= r ; r--) {
      for (c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== 0) {
          topRow = r;
          break;
        }
      }
      if (topRow !== r) {
        break;
      }
    }

    for (var i = 0; i < num; i++) {
      r = random(topRow, grid.length - 1);
      c = random(0, grid[0].length - 1);

      if (grid[r][c] !== 0) {
        holes.push({
          r: r,
          c: c,
          type: grid[r][c].type,
          block: grid[r][c].block
        });
        grid[r][c] = 0;
      }
    }

    return holes;
  };

  function randomBlock() {
    var i = random(0, BLOCK_TYPES.length - 1);

    var shapeType = SHAPE_TYPE_NORMAL;
    if (random(0, 60) <= 13) {
      shapeType = SHAPE_TYPES[random(0, SHAPE_TYPES.length - 1)];
    }

    return new Block(BLOCK_TYPES[i], shapeType);
  }

  function setNextBlock() {
    currentBlock = nextBlock;
    currentBlock.activate();
    nextBlock = randomBlock();

    var blockX = (side === SIDE_RIGHT) ? -5 : 11;
    nextBlock.setPosition(blockX, 0);
  }

  function checkFullLines() {
    var fullLines = [];
    for (var r = 0; r < grid.length; r++) {
      var isFull = true;
      for (var c = 0; c < grid[r].length; c++) {
        isFull = isFull && (grid[r][c] !== 0);
      }

      if (isFull) {
        fullLines.push(r);
      }
    }

    for (var rowNum = 0; rowNum < fullLines.length; rowNum++) {
      numCleared++;
      removeRow(fullLines[rowNum]);
    }
  }

  this.test = function() {
    createPowerup(SHAPE_TYPE_HOLES, this, other);
  };


  this.pushPowerUp = function(powerUp) {
    if (powerUp) {
      powerUps.push(powerUp);
    }
  };

  function removeRow(rowNum) {
    // Check for powerUps
    for (c = 0; c < FIELD_COLS; c++) {
      if (grid[rowNum][c].block !== SHAPE_TYPE_NORMAL) {
        createPowerup(grid[rowNum][c].block, this, other);
      }
    }

    var r, c;
    for (r = rowNum; 0 < r; r--) {
      for (c = 0; c < FIELD_COLS; c++) {
        grid[r][c] = grid[r - 1][c];
      }
    }

    for (c = 0; c < FIELD_COLS; c++) {
      grid[0][c] = 0;
    }
  }

  function insertClearedRowsInOtherPlayfield() {
    var numToInsert = Math.floor(numCleared / INSERT_AFTER_NUM_CLEARED_ROWS);
    if (numCleared === 0 || numToInsert <= numInsertedRows) {
      return;
    }

    while (numInsertedRows < numToInsert) {
      other.insertRow();
      numInsertedRows++;
    }
  }

  this.insertRow = function() {
    var r;
    // Move all rows up 1
    for (r = 0; r < FIELD_ROWS - 1; r++) {
      grid[r] = grid[r + 1];
    }

    // Insert new row of random type
    r = FIELD_ROWS - 1;
    grid[r] = [];
    var type = random(0, BLOCK_TYPES.length - 1);
    for (var c = 0; c < FIELD_COLS; c++) {
      grid[r][c] = 0;
      if (1 < random(1, 6)) {
        grid[r][c] = {
          type: type,
          block: 1
        };
      }
    }
  };

  this.hasLost = function() {
    return lost;
  };

  function checkGameOver() {
    if (!currentBlock.canGoDown(grid)) {
      isGameOver = true;
      lost = true;
      showGameOver();
    }
  }

  this.drawBlock = function(block, type, c, r) {
    gameContext.drawImage(blockImages[block][type], BLOCK_WIDTH * c + x, BLOCK_HEIGHT * r + y);
  };

  this.draw = function() {
    gameContext.beginPath();
    gameContext.strokeStyle = '#fff';
    gameContext.lineWidth = 2;

    var topPadding = 10;
    gameContext.moveTo(x, y - topPadding);
    gameContext.lineTo(x, y + FIELD_HEIGHT);
    gameContext.lineTo(x + FIELD_WIDTH, y + FIELD_HEIGHT);
    gameContext.lineTo(x + FIELD_WIDTH, y - topPadding);
    gameContext.stroke();
    drawFillRect(gameContext, x + 2, y - topPadding, FIELD_WIDTH - 4, FIELD_HEIGHT + topPadding - 2, '#131313');

    currentBlock.draw(x, y);
    nextBlock.draw(x, y);

    for (var r = 0; r < grid.length; r++) {
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== 0) {
          this.drawBlock(grid[r][c].block, grid[r][c].type, c, r);
        }
      }
    }

    for (var p = 0; p < powerUps.length; p++) {
      powerUps[p].draw();
    }

    // Progress bar
    drawFillRect(gameContext, x, y + FIELD_HEIGHT + 5, FIELD_WIDTH, 15, '#131313');
    var progressFillPercentage = numCleared % INSERT_AFTER_NUM_CLEARED_ROWS;
    if (0 < numCleared && 0 < progressFillPercentage) {
      var progressBarWidth = FIELD_WIDTH / INSERT_AFTER_NUM_CLEARED_ROWS * progressFillPercentage;
      drawFillRect(gameContext, x, y + FIELD_HEIGHT + 5, progressBarWidth, 15, '#fc2f89');
    }
    drawStrokeRect(gameContext, x, y + FIELD_HEIGHT + 5, FIELD_WIDTH, 15, '#fff', 2);
  };

  this.update = function(delta) {
    if (isGameOver) {
      return;
    }

    intervalRemaining -= delta * intervalMultiplier;
    if (intervalRemaining < 0) {
      intervalRemaining = interval;
      if (currentBlock.canGoDown(grid)) {
        currentBlock.moveDown(grid);
      }
      else {
        currentBlock.copyTo(grid);
        checkFullLines();
        setNextBlock();
        checkGameOver();
        insertClearedRowsInOtherPlayfield();
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


    for (var p = powerUps.length - 1; 0 <= p; p--) {
      powerUps[p].update(delta);
      if (powerUps[p].isReadyToRemove) {
        powerUps.splice(p, 1);
      }
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
