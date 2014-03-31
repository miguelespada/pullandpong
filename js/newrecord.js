var newrecord = new function(){
  this.new = function(txt, font, color){
    this.text = new createjs.Text(txt, font, color);
    this.text.x = CANVAS.width / 2;
    this.text.y = CANVAS.height / 2;
    this.text.textBaseline = "middle";
    this.text.textAlign = "center";
  };

  this.init = function(){
    this.new("New record!", "60px Helvetica", "#FF0000");
    CANVAS.addShape(this.text);
    createjs.Tween.get(this.text).to({alpha:0}, 1000);
    setTimeout(function(){CANVAS.removeShape(newrecord.text);}, 1000);
  };
};