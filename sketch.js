//Create variables here
var dogImg, happyDogImg, dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(250,300,150,150)
  dog.addImage(dogImg)
  dog.scale=0.15

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
}


function draw() {  

  
  //add styles here
  background("purple")
  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  stroke("white")
  textSize(20)
  fill("white") 
  text("Food Remaining "+foodS,170,200) 
  text("Note: Press UP_ARROW Key To Feed Drago Milk",40,20)
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0}
    else{
      x=x-1
    }
    database.ref('/').update({
    Food:x
  })
}



