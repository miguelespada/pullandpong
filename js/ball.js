var traceLen = 30;

var ball = new function(){

  this.radius = 8;

  this.angleFactor = 2;
  this.acc = 1.1;
  this.trace = new Array();

  this.createShape = function(color) {
    this.color = color;
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(color).drawCircle(0, 0, this.radius);
  };  

  this.randomDirectionY = function(){
    if(Math.random() < 0.5)
      this.dirY = -1;
    else
      this.dirY = 1;
  };

  this.setInitialSpeed = function(){
    this.incX = 5;
    this.incY = 5;
    this.dirX = -1;
    this.randomDirectionY();
  };

  this.setInitialPosition = function(x, y){
    this.x = x;
    this.y = y;
    this.setInitialSpeed();

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

  this.hit = function(CANVAS, bar){
    this.dirX *= -1;
    this.dirY = this.normalizedOffset(bar) * this.angleFactor;
    CANVAS.score += 1;
    this.incX *= this.acc;
  };

  this.bounce_left = function(CANVAS, bar){
    if ((this.x - this.radius) <= (bar.width) && 
        (this.offset(bar) >= 0 && this.offset(bar) <= bar.height)){
      this.hit(CANVAS, bar);
      return true;
    }
    return false;
  };

  this.bounce_right = function(CANVAS, bar){
    if ((this.x + this.radius) >= (CANVAS.width - bar.width) && 
        (this.offset(bar) >= 0 && this.offset(bar) <= bar.height)){
      this.hit(CANVAS, bar);
      return true;
    }
    return false
  };

  this.bounce = function(CANVAS, left_bar, right_bar) {
    this.bounceY(CANVAS);
    if(this.dirX == -1){
      if(this.bounce_left(CANVAS, left_bar)){
        left_bar.setActive(false);
        right_bar.setActive(true);
      }
    }
    else{
      if(this.bounce_right(CANVAS, right_bar)){
        left_bar.setActive(true);
        right_bar.setActive(false);

      }
    }
  };

  this.isOut = function(CANVAS){
    return this.x <= 0 || (this.x - this.radius) > CANVAS.width ;
  };

  this.pushTrace = function(x, y){
    var circle = new createjs.Shape();
    circle = new createjs.Shape();
    circle.graphics.beginFill(this.color).drawCircle(x, y, this.radius);
    this.trace.push(circle);
  };

  this.drawTrace = function(CANVAS){
    for(var i = 0; i < this.trace.length; i ++){
      this.trace[i].alpha = 1/(this.trace.length - i) * 0.75;
      CANVAS.addShape(this.trace[i]);
    }
    if(this.trace.length > traceLen){
      CANVAS.removeShape(this.trace[0]);
      this.trace.shift();
    };
  };

  this.emptyTrace = function(CANVAS){
    for(var i = 0; i < this.trace.length; i ++){
      CANVAS.removeShape(this.trace[i]);
    }
    this.trace = new Array();
  }

  this.update = function(CANVAS, left_bar, right_bar){
    // Debuggin keys
    // if(CANVAS.dLeft) this.x += 5;
    // if(CANVAS.dRight) this.x -= 5;
    // if(CANVAS.dUp) this.y -= 5;
    // if(CANVAS.dDown) this.y += 5;
    // ...
    this.pushTrace(this.x, this.y);

    this.x += this.incX * this.dirX;
    this.y += this.incY * this.dirY;

    if(this.isOut(CANVAS)){
      this.setInitialPosition(CANVAS.width/2, CANVAS.height/2);
      
      if(CANVAS.record < CANVAS.score) CANVAS.record = CANVAS.score;
      CANVAS.score = 0;

      left_bar.setActive(true);
      right_bar.setActive(false);

      this.emptyTrace(CANVAS);
    }
    this.bounce(CANVAS, left_bar, right_bar);
  };

  this.draw = function(){
    this.shape.x = this.x;
    this.shape.y = this.y;
    this.drawTrace(CANVAS);
  };
};