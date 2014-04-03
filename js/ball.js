var ball = new function(){

  this.radius = 20;

  this.angleFactor = 2;
  this.acc = 1.1;

  this.createShape = function(color) {
    this.color = color;
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(color).drawCircle(0, 0, this.radius/CANVAS.stage.scaleX);
  };  

  this.randomDirectionY = function(){
    if(Math.random() < 0.5)
      this.dirY = -1;
    else
      this.dirY = 1;
    this.dirY = 0;
  };

  this.setInitialSpeed = function(){
    this.incX = 15/CANVAS.stage.scaleX;
    this.incY = 15/CANVAS.stage.scaleY;
    this.dirX = -1;
    this.randomDirectionY();
  };

  this.setInitialPosition = function(x, y){
    this.x = x;
    this.y = y;
    this.incX = 0;
    this.incY = 0;
  };

  this.init = function(color) { 
    this.createShape(color);
    this.breakrecord = false;
  };

  this.bounceY = function(CANVAS) {
    if ( (this.y + this.radius/CANVAS.stage.scaleX >= CANVAS.height && this.dirY >= 0)
      || (this.y - this.radius/CANVAS.stage.scaleX <= 0 && this.dirY < 0)){
      this.dirY *= -1;
    }
  };

  this.offset = function(bar){
    return this.y - bar.y
  }

  this.normalizedOffset = function(bar){
    return (this.offset(bar) - bar.height/CANVAS.stage.scaleY/2) / (bar.height/CANVAS.stage.scaleY/2);
  }

  this.hit = function(CANVAS, bar){
    this.dirX *= -1;
    this.dirY = this.normalizedOffset(bar) * this.angleFactor;
    
    // Add noise when chit on the center bar
    if(Math.abs(this.dirY) < 0.1) (this.dirY = Math.random() - 0.5) / 2;

    CANVAS.score += 1;
    this.incX *= this.acc;
    if(this.incX > 30/CANVAS.stage.scaleX) this.incX = 30/CANVAS.stage.scaleX;
  };

  this.bounce_left = function(CANVAS, bar){
    if ((this.x - this.radius/CANVAS.stage.scaleX - 50/CANVAS.stage.scaleX ) <= (bar.width/CANVAS.stage.scaleX) && 
        (this.offset(bar) >= 0 && this.offset(bar) <= bar.height/CANVAS.stage.scaleY)){
      this.hit(CANVAS, bar);
      return true;
    }
    return false;
  };

  this.bounce_right = function(CANVAS, bar){
    if ((this.x + this.radius/CANVAS.stage.scaleX + 50/CANVAS.stage.scaleX ) >= (CANVAS.width - bar.width/CANVAS.stage.scaleX) && 
        (this.offset(bar) >= 0 && this.offset(bar) <= bar.height/CANVAS.stage.scaleY)){
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
    return this.x <= 50/CANVAS.stage.scaleX || (this.x - this.radius/CANVAS.stage.scaleX) > CANVAS.width - 50/CANVAS.stage.scaleX ;
  };

  this.hide = function(){
    createjs.Tween.get(this.shape).to({alpha:0}, 1);
  };

  this.show = function(){
    createjs.Tween.get(this.shape).to({alpha:1}, 1);
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

      $("#puntos").hide();

      if (this.breakrecord){
        $("#block3").show();
        CANVAS.record = CANVAS.score;
        text.entergame();
        this.breakrecord = false;
      }
      else {
        $("#block2").show();
      }

      this.setInitialPosition(CANVAS.width/2, CANVAS.height/2);

      left_bar.setActive(true);
      right_bar.setActive(false);

    }

    if (CANVAS.record < CANVAS.score){
      if (!this.breakrecord){
        text.newrecord();
        this.breakrecord = true;
      }
    }

    this.bounce(CANVAS, left_bar, right_bar);
  };

  this.draw = function(){
    this.shape.x = this.x;
    this.shape.y = this.y;
  };
};