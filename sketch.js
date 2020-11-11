//Create variables here
var dog,hdog,dogimg,hdogimg
var database
var foodS,foodStock
var feed,addFood
var lastFed,fedTime
var foodObj
function preload()
{
  //load images here
  dogimg =loadImage('dog.png');
  hdogimg =loadImage('happydog.png');
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);

  dog=createSprite(250,350)
  dog.addImage(dogimg)

  var foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj= new Food();

}
  


function draw() {  
  background(46,139,87);
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foods)
  //   dog.addImage(hdogimg)
  // }
  foodObj.display()

  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
  lastFed=data.val()
  })


  // textSize(20)
  // fill('white')
  // text("Stock:"+foods,200,250)


  fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("last Feed:"+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("last Feed:12 AM",350,30);
  }else{
    text("last Feed:"+lastFed+"AM",350,30)
  }
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(hdogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}