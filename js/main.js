var drawCanvas, drawContext;
var gameCanvas, gameContext;

var screenShakeAmount = 0;
var screenShakeAmountHalf = 0;

var isPlaying = false;
var isGameOver = false;

var player1, player2;

var settings = {
  controlSchemePlayer1: 0,
  controlSchemePlayer2: 3
};

var blockImages = [];

window.onload = function() {
  gameCanvas = document.getElementById('gameCanvas');
  gameContext = gameCanvas.getContext('2d');

  initDrawingCanvas();

  var _settings = JSON.parse(localStorage.getItem('settings'));
  if (_settings) {
    settings = _settings;
  }

  MainLoop
    .stop()
    .setUpdate(gameUpdate)
    .setDraw(gameDraw);

  Sounds.initialize(function() {
    Music.initialize(function() {
      Images.initialize(menuInitialize);
    })
  });
};

function gameInitialize() {
  isPlaying = true;

  player1 = new Playfield(settings['controlSchemePlayer1'], 130, SIDE_LEFT);
  player2 = new Playfield(settings['controlSchemePlayer2'], 820, SIDE_RIGHT);

  for (var b = 0; b < BLOCK_TYPES.length; b++) {
    blockImages[b] = document.createElement('canvas');
    blockImages[b].width = BLOCK_WIDTH;
    blockImages[b].height = BLOCK_HEIGHT;

    var context = blockImages[b].getContext('2d');

    context.fillStyle = BLOCK_COLORS[b];
    context.fillRect(0, 0, blockImages[b].width, blockImages[b].height);
    context.globalCompositeOperation = 'destination-atop';
    context.drawImage(Images.block, 0, 0, Images.block.width, Images.block.height, 0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
  }

  MainLoop.start();
}

function setSetting(setting, value) {
  settings[setting] = value;

  if (localStorage && localStorage.setItem) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  return settings[setting];
}

function shakeScreen(amount) {
  screenShakeAmountHalf = amount / 2;
  screenShakeAmount = amount;
}

function gameUpdate(delta) {
  // Call the update methods of all objects.
  player1.update(delta);
  player2.update(delta);

  TWEEN.update(delta);
}

function gameDraw(interpolationPercentage) {
  clearCanvas();
  gameContext.save();

  if (screenShakeAmount) {
    if (screenShakeAmount < screenShakeAmountHalf) {
      screenShakeAmount *= 0.75;
    }
    else {
      screenShakeAmount *= 0.95;
    }

    gameContext.translate(Math.random() * screenShakeAmount - screenShakeAmount * 0.5, Math.random() * screenShakeAmount - screenShakeAmount * 0.5);

    if (screenShakeAmount <= 0.02) {
      screenShakeAmount = 0;
    }
  }

  // Call the draw methods of all objects.
  player1.draw(interpolationPercentage);
  player2.draw(interpolationPercentage);

  gameContext.restore();
  redrawCanvas();
}

function clearCanvas() {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  redrawCanvas();
}

// Make sure we can handle the game when it has fallen too far behind real time.
// For example when the browser window is hidden or moved to the background.
MainLoop.setEnd(function(fps, panic) {
  if (panic) {
    var discardedTime = Math.round(MainLoop.resetFrameDelta());
    console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
  }
});
