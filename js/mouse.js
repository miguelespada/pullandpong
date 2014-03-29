   handleTouch = function() {
      createjs.Touch.enable(PM.stage);
      PM.stage.on("stagemousedown", function(event){PM.mouseDown(event);});
      PM.stage.on("stagemousemove", function(event){PM.mouseMove(event);});
      PM.stage.on("stagemouseup", function(event){PM.mouseUp(event);});
      document.addEventListener( 'mouseup', PM.mouseUp, false );
    }

    PM.mouseDown = function(event) {
      PM.touchStart = event.stageY;
      PM.touch = true;
    }

    PM.mouseMove = function(event) {
      if (PM.touch){
        if (event.stageY > PM.touchTrack){
          PM.down = true;
          PM.up = false;
        }
        else if (event.stageY < PM.touchTrack){
          PM.up = true;
          PM.down = false;
        }
        PM.touchTrack = event.stageY;
  
        if (event.stageY > PM.touchStart && event.stageY < PM.touchTrack){
          PM.touchStart = PM.touchTrack;
        }
        else if (event.stageY < PM.touchStart && event.stageY > PM.touchTrack){
          PM.touchStart = PM.touchTrack;
        }
      }
    }

    PM.mouseUp = function() {
      PM.touchStart = 0;
      PM.touchTrack = 0;
      PM.up = false;
      PM.down = false;
      PM.touch = false;
    }

