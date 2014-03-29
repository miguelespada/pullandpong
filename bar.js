function bar(color){
  this.color = color;
  this.incY = 10;
  this.width = 15;
  this.height = 80;
  
  this.init = function(x, y){
    this.x = x;
    this.y = y;
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.color)
              .drawRect(this.x, this.y, this.width, this.height)
              .endFill();
   };
};
