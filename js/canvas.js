var CANVAS = new function(){
  this.up = false;
  this.down = false;

  this.createStage = function(){
    this.stage = new createjs.Stage(this.id);
  }

  this.getSize = function() {
    this.width = parseInt($("#" + this.id).css("width"));
    this.height = parseInt($("#" + this.id).css("height"));
  };

  this.init = function(name){
    this.id = name;
    this.createStage();
    this.getSize();
  };

  this.update = function(){
    this.stage.update();
  };

  this.addShape = function(shape){
    this.stage.addChild(shape);
  };

  this.removeShape = function(shape){
    this.stage.removeChild(shape);
  };
};

