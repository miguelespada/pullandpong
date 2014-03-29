handleKeyDown = function(event) {
  if (!event) {
    var event = window.event;
  }
  switch(event.keyCode){ 
    case 38: CANVAS.up = true; break;
    case 40: CANVAS.down  = true; break;

    case 87: CANVAS.dUp = true; break;
    case 83: CANVAS.dDown = true; break;
    case 65: CANVAS.dRight = true; break;
    case 68: CANVAS.dLeft = true; break;
  }
};

handleKeyUp = function(event) {
  if (!event) {
    var event = window.event;
  }
  switch(event.keyCode) {

    case 38: CANVAS.up = false; break;
    case 40: CANVAS.down  = false; break;
    
    case 87: CANVAS.dUp = false; break;
    case 83: CANVAS.dDown = false; break;

    case 65: CANVAS.dRight = false; break;
    case 68: CANVAS.dLeft = false; break;

  }
};
