function drawFillRectRotated(canvasContext, topLeftX, topLeftY, boxWidth, boxHeight, fillColor, angle) {
  var hw = boxWidth / 2;
  var hh = boxHeight / 2;
  canvasContext.save();
  canvasContext.translate(topLeftX + hw, topLeftY + hh);
  canvasContext.rotate(angle);

  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(-hw, -hh, boxWidth, boxHeight);

  canvasContext.restore()
}
function drawFillRect(canvasContext, topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function drawStrokeRect(canvasContext, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, lineWidth) {
  canvasContext.strokeStyle = strokeColor;
  if (lineWidth !== undefined) {
    var oldLineWidth = canvasContext.lineWidth;
    canvasContext.lineWidth = lineWidth;
  }
  canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
  if (lineWidth !== undefined) {
    canvasContext.lineWidth = oldLineWidth;
  }
}
