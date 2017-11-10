var $activeWrapperScreen;

function menuInitialize() {
  $('#loading').remove();

  setupInput();

  showMenu();

  $('#wrapper a').on('click', function (event) {
    event.preventDefault();

    $activeWrapperScreen.hide();

    if ($(this).hasClass('play')) {
      gameInitialize();
    }
    else if ($(this).hasClass('continue')) {
      continueGame();
    }
    else {
      stopGameForMenu();
      $activeWrapperScreen = $(this.hash).show();
    }
  });

  settingsInitialize(1);
  settingsInitialize(2);

  if (DEBUG) {
    // start play now!
    $('a.play').trigger('click');
  }
}

function showMenu() {
  stopGameForMenu();

  if ($activeWrapperScreen) {
    $activeWrapperScreen.hide();
  }

  $activeWrapperScreen = $('#menu').show();
}

function stopGameForMenu() {
  if (isPlaying || isGameOver) {
    isPaused = false;
    isPlaying = false;
    isGameOver = false;
    MainLoop.stop();
    clearCanvas();
  }
}

function showGameOver() {
  MainLoop.stop();
  $activeWrapperScreen = $('#gameOver').show();

  $activeWrapperScreen.find('.player-won').text('Player ' + (player1.hasLost() ? 2 : 1));
  $activeWrapperScreen.find('.player-lost').text('player ' + (player1.hasLost() ? 1 : 2));
}

function showGamePause() {
  isPaused = true;
  MainLoop.stop();
  $activeWrapperScreen = $('#gamePause').show();
}

function continueGame() {
  isPaused = false;
  MainLoop.start();
  $activeWrapperScreen = $('#gamePause').hide();
}

function settingsInitialize(player) {
  var $div = $('#settingsPlayer' + player);

  var $list = $('<ul></ul>');

  for (var i = 0; i < controlSchemes.length; i++) {
    var $label = $('<label>' + controlSchemes[i].label + '</label>');
    var $option = $('<input type="radio" name="controlSchemePlayer' + player + '" value="' + i + '" />')
      .on('change', function () {
        // @todo check if other player has the same control scheme!
        setSetting('controlSchemePlayer' + player, this.value);
      });

    if (settings['controlSchemePlayer' + player] == i) {
      $option.prop('checked', 'checked');
    }

    $list.append($('<li></li>').append($label.prepend($option)));
  }

  $div.append($list);
}
