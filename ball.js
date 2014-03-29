var ball = new function(){

  this.radius = 15;

  this.incX = 5;
  this.incY = 5;
  this.dirX = -1;
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

  this.offset = function(bar){
    return this.y - bar.y
  }

  this.normalizedOffset = function(bar){
    return (this.offset(bar) - bar.height /2) / (bar.height/2);
  }

  this.bounce_left = function(bar){
    if ((this.x - this.radius) <= (bar.width) && 
        (this.offset(bar) >= 0 && this.offset(bar) <= bar.height)){
      this.dirX *= -1;
    }
  };

  this.bounce_right = function(CANVAS){
    if ((this.x + this.radius) >= CANVAS.width)
      this.dirX *= -1;
  };

  this.bounce = function(CANVAS, bar_left) {
    this.bounceY(CANVAS);
    if(this.dirX == -1)
      this.bounce_left(bar_left);
    else
      this.bounce_right(CANVAS);
  };

  this.isOut = function(CANVAS){
    return this.x <= 0;
  };

  this.update = function(CANVAS, bar_left){
    // Debuggin keys
    // if(CANVAS.dLeft) this.x += 5;
    // if(CANVAS.dRight) this.x -= 5;
    // if(CANVAS.dUp) this.y -= 5;
    // if(CANVAS.dDown) this.y += 5;
    // ...

   this.x += this.incX * this.dirX;
   this.y += this.incY * this.dirY;

    if(this.isOut(CANVAS)){
      this.setInitialPosition(CANVAS.width/2, CANVAS.height/2);
    }

    this.bounce(CANVAS, bar_left);
  };

  this.draw = function(){
    this.shape.x = this.x;
    this.shape.y = this.y;
  };
};