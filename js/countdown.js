var countdown = new function(){
  this.number = function(number, font, color){
    this.text = new createjs.Text(number, font, color);
    this.text.x = CANVAS.width / 2;
    this.text.y = CANVAS.height / 2;
    this.text.textBaseline = "middle";
    this.text.textAlign = "center";
  };

  this.init = function(){
    for (i = 3; i > 0; i --){
      (function(j){
        setTimeout(function(){
          CANVAS.removeShape(countdown.text);
          countdown.number(j, "100px Helvetica", "#FF0000");
          CANVAS.addShape(countdown.text);
          createjs.Tween.get(countdown.text).to({alpha:0}, 1000);
        },(3 - j) * 1000);
      })(i);
    }
  };
};