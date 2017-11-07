function createPowerup(type, player, other) {
  switch (type) {
    case SHAPE_TYPE_SPEED_UP:
      other.pushPowerUp(new PowerUpSpeedUp(player, other));
      break;
    case SHAPE_TYPE_HOLES:
      other.pushPowerUp(new PowerUpHoles(other));
      break;
  }
}

var PowerUpSpeedUp = function(player, other) {

  this.isReadyToRemove = false;

  var timeRemaining = 2000;

  this.draw = function() {};

  this.update = function(delta) {
    timeRemaining -= delta;
    this.isReadyToRemove = (0 < timeRemaining);
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
