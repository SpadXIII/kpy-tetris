var Playfield = function(controlSchemeId, x, side) {

  var y = 100;
  var other;

  var grid = [];

  var interval = TICK_INTERVAL;

  var intervalRemaining = interval;

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

  initialize();

  this.g = function() {
    console.log(grid);
  };

  this.setInterval = function(_interval) {
    interval = _interval;
  };

  function initialize() {
    nextBlock = randomBlock();
    setNextBlock();

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

  function randomBlock() {
    var i = random(0, BLOCK_TYPES.length - 1);

    return new Block(BLOCK_TYPES[i]);
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

  function removeRow(rowNum) {
    for (var r = rowNum; 0 < r; r--) {
      for (var c = 0; c < FIELD_COLS; c++) {
        grid[r][c] = grid[r - 1][c];
      }
    }

    for (var c = 0; c < FIELD_COLS; c++) {
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
    var type = random(0, BLOCK_TYPES.length - 1);
    var row = [];
    for (var c = 0; c < FIELD_COLS; c++) {
      if (random(1, 3) === 1) {
        row[c] = 0;
      }
      else {
        row[c] = {
          type: type,
          block: 1
        };
      }
    }

    grid[r] = row;

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
          gameContext.drawImage(blockImages[grid[r][c].type], BLOCK_WIDTH * c + x, BLOCK_HEIGHT * r + y);
        }
      }
    }
  };

  this.update = function(delta) {
    if (isGameOver) {
      return;
    }

    intervalRemaining -= delta;
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
