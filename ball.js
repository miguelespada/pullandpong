var ball = new function(){

  this.radius = 15;

  this.incX = 5;
  this.incY = 5;
  this.dirX = 1;
  this.dirY = 1;
  this.angleFactor = 1.5;

  this.createShape = function(color) {
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(color).drawCircle(0, 0, this.radius);
  };  

  this.setInitialPosition = function(x, y){
    this.x = x;
    this.y = y;
  };

  this.init = function(color) { 
    this.createShape(color);
  };

  this.bounceY = function(CANVAS) {
    if ( (this.y >= CANVAS.height - this.radius && this.dirY == 1)
      || (this.y <= this.radius && this.dirY == -1))
      this.dirY *= -1;
  };

  this.bounceX = function(CANVAS){
     if ( (this.x >= CANVAS.width - this.radius && this.dirX == 1)
      || (this.x <= this.radius && this.dirX == -1))
      this.dirX *= -1;
  };

  this.bounce = function(CANVAS) {
    this.bounceY(CANVAS);
    this.bounceX(CANVAS);
  };

  this.update = function(CANVAS){
    this.x += this.incX * this.dirX;
    this.y += this.incY * this.dirY;

    this.bounce(CANVAS);
  };

  this.draw = function(){
    this.shape.x = this.x;
    this.shape.y = this.y;
  };
};