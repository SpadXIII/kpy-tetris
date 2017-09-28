var $activeWrapperScreen;

function menuInitialize() {
  $('#loading').remove();

  setupInput();

  showMenu();

  $('#wrapper a').on('click', function (event) {
    event.preventDefault();

    $activeWrapperScreen.hide();
    $activeWrapperScreen = $(this.hash).show();

    if ($(this).hasClass('play')) {
      gameInitialize();
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
  if (isPlaying) {
    isPlaying = false;
    MainLoop.stop();
    clearCanvas();
  }

  if ($activeWrapperScreen) {
    $activeWrapperScreen.hide();
  }

  $activeWrapperScreen = $('#menu').show();
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
      $option.attr('checked', 'checked');
    }

    $list.append($label.prepend($option).append('<li></li>'));
  }

  $div.append($list);
}
