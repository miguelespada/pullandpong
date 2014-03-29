var ball = {};

ball.radius = 15;

ball.incX = 5;
ball.incY = 5;
ball.dirX = 1;
ball.dirY = 1;
ball.angleFactor = 1.5;

ball.createShape = function(color, stage) {
  ball.shape = new createjs.Shape();
  ball.shape.graphics.beginFill(color).drawCircle(0, 0, ball.radius);
  stage.addChild(ball.shape);
};  

ball.setInitialPosition = function(stage){
  ball.x = CANVAS.width/2;
  ball.y = CANVAS.height/2;
}

ball.init = function(color, stage) { 
  ball.createShape(color, stage);
  ball.setInitialPosition(stage);
};

ball.move = function(){
  ball.x += ball.incX * ball.dirX;
  ball.y += ball.incY * ball.dirY;
}
ball.draw = function(){
  ball.shape.x = ball.x;
  ball.shape.y = ball.y;
}

ball.boundceEdge = function() {
  if (ball.y >= CANVAS.height - ball.radius || 
      ball.y <= ball.radius){
    ball.dirY *= -1;
  }
};

