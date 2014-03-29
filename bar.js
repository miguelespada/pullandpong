 PM.barWidth = 15;
    PM.barHeight = 80;

    PM.barMove = 10;

    PM.touch = false;

      PM.addBarLeft("#FFFFFF");
      PM.addBarRight("#FFFFFF");


  
    PM.gameOver = false;

      PM.addBarLeft = function(barcolor) {
      PM.barLeft = new createjs.Shape();
      PM.barLeft.graphics.beginFill(barcolor)
                .drawRect(0, 
                          PM.doodleYCenter, 
                          PM.barWidth, 
                          PM.barHeight)
                .endFill();
      PM.stage.addChild(PM.barLeft);
    };

    PM.addBarRight = function(barcolor) {
      PM.barRight = new createjs.Shape();
      PM.barRight.graphics.beginFill(barcolor)
                          .drawRect(PM.doodleWidth, 
                                    PM.doodleYCenter, 
                                    - PM.barWidth, 
                                    PM.barHeight)
                          .endFill();
      PM.stage.addChild(PM.barRight);
    };
