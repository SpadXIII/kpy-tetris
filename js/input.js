// Prevents player from drag selecting
document.onselectstart = function() {
  window.getSelection().removeAllRanges();
};
document.onmousedown = function() {
  window.getSelection().removeAllRanges();
};
document.oncontextmenu = function() {
  return false;
};

function setupInput() {
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
}

function keyDown(event) {
  if (event.keyCode === KEY_ESC) {
    showMenu();
  }

  // Call each play field and let them handle the key press.
  //playField.keyDown(event);

  if (event.keyCode === KEY_SPACE) {
    event.preventDefault();
  }
}

function keyUp(event) {
  // Call each play field and let them handle the key release.
  //playField.keyUp(event);
}
