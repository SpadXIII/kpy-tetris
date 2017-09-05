var drawCanvas, drawContext;
var gameCanvas, gameContext;

var screenShakeAmount = 0;
var screenShakeAmountHalf = 0;

// Make sure redrawCanvas is called each draw-cycle by default.
var MainLoop_setDraw = MainLoop.setDraw;
MainLoop.setDraw = function(fun) {
  fun = fun || function() {};
  return MainLoop_setDraw.call(this, function(interpolationPercentage) {
    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    fun(interpolationPercentage);

    redrawCanvas();
  });
};

// Make sure TWEEN.update is called each update-cycle by default.
var MainLoop_setUpdate = MainLoop.setUpdate;
MainLoop.setUpdate = function(fun) {
  fun = fun || function() {};
  return MainLoop_setUpdate.call(this, function(delta) {
    fun(delta);
    TWEEN.update(delta);
  });
};

window.onload = function() {
  gameCanvas = document.getElementById('gameCanvas');
  gameContext = gameCanvas.getContext('2d');

  initDrawingCanvas();

  Sounds.initialize(function() {
    Music.initialize(function() {
      Images.initialize(menuInitialize);
    })
  });

  var _settings = JSON.parse(localStorage.getItem('settings'));
  if (_settings) {
    settings = _settings;
  }
};

function menuInitialize() {
  var loading = document.getElementById('loading');
  loading.parentNode.removeChild(loading);

  // debug
  gameInitialize();
}

function gameInitialize(gameMode) {
  MainLoop
    .stop()
    .setUpdate(gameUpdate)
    .setDraw(gameDraw)
    .start();
}

function shakeScreen(amount) {
  screenShakeAmountHalf = amount / 2;
  screenShakeAmount = amount;
}

function gameUpdate(delta) {
  // Call the update methods of all objects.
}

function gameDraw(interpolationPercentage) {
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

  gameContext.restore();
}

// Make sure we can handle the game when it has fallen too far behind real time.
// For example when the browser window is hidden or moved to the background.
MainLoop.setEnd(function(fps, panic) {
  if (panic) {
    var discardedTime = Math.round(MainLoop.resetFrameDelta());
    console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
  }
});
