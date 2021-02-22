var balloon,bg;

var database,position;

function preload(){

bg=loadImage("abc.png");
p1=loadAnimation("p1.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")

}

function setup() {

  createCanvas(800,400);

  database=firebase.database();

  balloon = createSprite(250,250,5,5);
  balloon.addAnimation("ballonImg",p1);
  balloon.scale = 0.4

  var balloonPosition=database.ref('balloon/position');

  balloonPosition.on("value",readPosition,showError);

}

function draw() {
  background(bg);  

  if(position!==undefined)
  
  {

  if(keyDown(LEFT_ARROW))
  {
    changePosition(-1,0);
  }
  
  else if(keyDown(RIGHT_ARROW))
  {
    changePosition(1,0);
  }
  
  else if(keyDown(UP_ARROW))
  {
    changePosition(0,-1);
    balloon.scale = balloon.scale - 0.001
  }
  
  else if(keyDown(DOWN_ARROW))
  {
    changePosition(0,+1);
    balloon.scale = balloon.scale + 0.001
  }
  
}

  drawSprites();
}


function changePosition(x,y){

  database.ref('balloon/position').set({
  'x':position.x+x,
  'y':position.y+y,

  }
  )
}


function readPosition(data){

  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  
  }
  
  function showError(){
  
  console.log('Error in writing to the database');
  
  }

