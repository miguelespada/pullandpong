var ball = new function(){

  this.radius = 15;

  this.incX = 5;
  this.incY = 5;
  this.dirX = 1;
  this.dirY = 0;
  this.angleFactor = 2;

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
    if ( (this.y + this.radius >= CANVAS.height && this.dirY >= 0)
      || (this.y - this.radius <= 0 && this.dirY < 0)){
      this.dirY *= -1;
    }

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
      this.dirY = this.normalizedOffset(bar) * this.angleFactor;
    }
  };


  this.bounce_right = function(CANVAS, bar){

    if ((this.x + this.radius) >= (CANVAS.width - bar.width) && 
        (this.offset(bar) >= 0 && this.offset(bar) <= bar.height)){
      this.dirX *= -1;
      this.dirY = this.normalizedOffset(bar) * this.angleFactor;
    }
  };



  this.bounce = function(CANVAS, left_bar, right_bar) {
    this.bounceY(CANVAS);
    if(this.dirX == -1)
      this.bounce_left(left_bar);
    else
      this.bounce_right(CANVAS, right_bar);
  };

  this.isOut = function(CANVAS){
    return this.x <= 0 || (this.x - this.radius) > CANVAS.width ;
  };

  this.update = function(CANVAS, left_bar, right_bar){
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

    this.bounce(CANVAS, left_bar, right_bar);
  };

  this.draw = function(){
    this.shape.x = this.x;
    this.shape.y = this.y;
  };
};