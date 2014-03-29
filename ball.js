var ball = {};

ball.radius = 15;

ball.incX = 0;
ball.incY = 5;
ball.dirX = 1;
ball.dirY = 1;
ball.angleFactor = 1.5;

ball.createShape = function(color) {
  this.shape = new createjs.Shape();
  this.shape.graphics.beginFill(color).drawCircle(0, 0, this.radius);
};  

ball.setInitialPosition = function(x, y){
  this.x = x;
  this.y = y;
};

ball.init = function(color) { 
  this.createShape(color);
};

ball.bounce = function(CANVAS) {
  if ( (this.y >= CANVAS.height - this.radius && this.dirY == 1)
    || (this.y <= this.radius && this.dirY == -1))
    this.dirY *= -1;
};


ball.update = function(CANVAS){
  this.x += this.incX * this.dirX;
  this.y += this.incY * this.dirY;

  this.bounce(CANVAS);
};

ball.draw = function(){
  this.shape.x = this.x;
  this.shape.y = this.y;
};



