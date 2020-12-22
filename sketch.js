//Create variables here
var dog, lastFed, dogImage, dogImage, database, foodStock,foodS;
foodS=0;
function preload()
{
  dogImage=loadImage("images/dogImg.png");
  dogImage1=loadImage("images/dogImg1.png");

	//load images here
}

function setup() {
  database=firebase.database();
  createCanvas(800,400);
  dog=createSprite(600,200,150,150)
  dog.addImage(dogImage);
  dog.scale=0.15;
  foodObj=new Food();
foodStock=database.ref('Food');
foodStock.on('value', readStock);

feed=createButton("Feed the dog")
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods)
 
}


function draw() {  
  background('lightBlue');
    fedTime=database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  foodObj.display();
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + " PM ", 350,30);

  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  
  }else{
    text("Last Feed : "+ lastFed +" AM",350,30)
  }
  if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(dogImage1)
  }
  drawSprites();
  //add styles here
fill('black');
text("food remaining for dog: "+foodS, 170,200);
textSize('13');
text("Press UP ARROW", 130,10,300,20);
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDog);


foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
})
}
function addFoods(){
  foodS++;
  database.red('/').update({
    Food:foodS

  })
}