function createPowerup(type, player, other) {
  switch (type) {
    case SHAPE_TYPE_SPEED_UP:
      other.pushPowerUp(new PowerUpSpeedUp(other));
      break;
    case SHAPE_TYPE_HOLES:
      other.pushPowerUp(new PowerUpHoles(other));
      break;
  }
}

var PowerUpSpeedUp = function(player) {

  this.isReadyToRemove = false;

  var timeRemaining = SPEED_UP_FADE_TIME;

  player.setIntervalMultiplier(3);

  var posX = (player.getSide() === SIDE_RIGHT) ? 145 : -175;
  posX += gameCanvas.width / 2;

  this.draw = function() {
    var perc = Math.round(((SPEED_UP_FADE_TIME - timeRemaining) / SPEED_UP_FADE_TIME) * 100) / 100;
    drawStrokeCircle(gameContext, posX, 280, 20, perc, 'white', 4);
  };

  this.update = function(delta) {
    timeRemaining -= delta;
    this.isReadyToRemove = (timeRemaining <= 0);
    if (this.isReadyToRemove) {
      player.unsetIntervalMultiplier();
    }
  };

};

var PowerUpHoles = function(player) {

  this.isReadyToRemove = false;

  var timeRemaining = HOLES_FADE_TIME;

  var holes;

  this.draw = function() {
    var perc = Math.round((timeRemaining * 1.5 / HOLES_FADE_TIME) * 100) / 100;

    gameContext.save();
    gameContext.globalAlpha = perc;

    for (var i = 0; i < holes.length; i++) {
      player.drawBlock(holes[i].block, holes[i].type, holes[i].c, holes[i].r);
    }

    gameContext.restore();
  };

  this.update = function(delta) {
    if (!holes) {
      holes = player.createHoles();
    }

    timeRemaining -= delta;
    this.isReadyToRemove = (timeRemaining <= 0);
  };

};
