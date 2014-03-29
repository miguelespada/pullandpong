var CANVAS = {};


CANVAS.createStage = function(){
  CANVAS.stage = new createjs.Stage(CANVAS.id);
}

CANVAS.getSize = function() {
  CANVAS.width = parseInt($("#" + CANVAS.id).css("width"));
  CANVAS.height = parseInt($("#" + CANVAS.id).css("height"));
};

CANVAS.setStagePosition = function(){
  //PM.doodleYCenter = (PM.doodleHeight - PM.barHeight)/2;
}


CANVAS.init = function(){
  CANVAS.id = "doodle";
  CANVAS.createStage();
  CANVAS.getSize();
}

CANVAS.update = function(){
  CANVAS.stage.update();
}