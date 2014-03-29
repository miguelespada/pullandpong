function bar(){
  this.incY = 10;
  this.width = 10;
  this.height = 80;

  this.init = function(color, dir){
    this.color = color;
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.color)
         .drawRect(0, 0, this.width, this.height)
         .endFill();

    this.dir = dir;
  };

  this.setInitialPosition = function(x, y){
    this.x = x;
    this.y = y;
   };

  this.move = function(CANVAS, dir){
    this.y += this.incY * dir;
    
    //rollback if out of borders
    if(this.y > (CANVAS.height - this.height) || this.y < 0)
      this.y -= this.incY * dir;
   };

   this.update = function(CANVAS){
      if (CANVAS.up) this.move(CANVAS, -1 * this.dir);
      if (CANVAS.down) this.move(CANVAS, 1 * this.dir);
   };

   this.draw = function(){
    this.shape.x = this.x;
    this.shape.y = this.y;
  };

  this.setActive = function(value){
    if(value){
      createjs.Tween.get(this.shape).to({alpha:1}, 400);
    }
    else{
      createjs.Tween.get(this.shape).to({alpha:0.3}, 400);
    }
  };
};
