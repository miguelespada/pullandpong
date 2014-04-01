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

    this.canvasSize();
    this.stage.update();
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

  this.addTouch = function(){
    createjs.Touch.enable(this.stage);
  };

  this.canvasSize = function(){
    this.containerWidth = document.getElementById("container").clientWidth;
    this.containerHeight = document.getElementById("container").clientHeight;
  
    this.stageWidth = 1000;
    this.stageHeight = 520;
  
    this.stage.scaleX = this.stageWidth / this.containerWidth;
    this.stage.scaleY = this.stageHeight / this.containerHeight;
  };
};

