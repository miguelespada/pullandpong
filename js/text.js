var text = new function(){
  this.new = function(txt, font, color){
    this.shape = new createjs.Text(txt, font, color);
    this.shape.x = CANVAS.width / 2;
    this.shape.y = CANVAS.height / 2;
    this.shape.textBaseline = "middle";
    this.shape.textAlign = "center";
  };

  this.countdown = function(){
    for (i = 3; i > 0; i --){
      (function(j){
        setTimeout(function(){
          CANVAS.removeShape(text.shape);
          text.new(j, 100/CANVAS.stage.scaleX + "px Helvetica", "#feeda7");
          CANVAS.addShape(text.shape);
          createjs.Tween.get(text.shape).to({alpha:0}, 1000);
        },(3 - j) * 1000);
      })(i);
    }
  };

  this.newrecord = function(){
    this.new("New record!", 60/CANVAS.stage.scaleX + "px Helvetica", "#feeda7");
    CANVAS.addShape(this.shape);
    createjs.Tween.get(this.shape).to({alpha:0}, 1000);
    setTimeout(function(){CANVAS.removeShape(text.shape);}, 1000);
  };

  this.score = function(score){
    this.new("Your score: " + score, 60/CANVAS.stage.scaleX + "px Helvetica", "#feeda7");
    CANVAS.addShape(this.shape);
    createjs.Tween.get(this.shape).to({alpha:0}, 2000);
    setTimeout(function(){CANVAS.removeShape(text.shape);}, 4000);
  };

  this.scoreandrecord = function(score){
    this.new("Your score: " + score + "\n" + "New record!", 60/CANVAS.stage.scaleX + "px Helvetica", "#feeda7");
    this.shape.y = CANVAS.height / 2 - 30 / CANVAS.stage.scaleY;
    CANVAS.addShape(this.shape);
    createjs.Tween.get(this.shape).to({alpha:0}, 2000);
    setTimeout(function(){CANVAS.removeShape(text.shape);}, 2000);
  };
};