var CANVAS = {};

CANVAS.up = false;
CANVAS.down = false;

CANVAS.createStage = function(){
  this.stage = new createjs.Stage(this.id);
}

CANVAS.getSize = function() {
  this.width = parseInt($("#" + this.id).css("width"));
  this.height = parseInt($("#" + this.id).css("height"));
};

CANVAS.init = function(name){
  this.id = name;
  this.createStage();
  this.getSize();
};

CANVAS.update = function(){
  this.stage.update();
};

CANVAS.addShape = function(shape){
  this.stage.addChild(shape);
};