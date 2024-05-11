

let imgs =[];// horse image array
let horse1,horse2,horse3,horse4;
let table,mix1,mix2,mix3;
let checkbox;
let joke,bored,quote,ip,temp,gentime;//API variables
//API URLs
let joke_api = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
let bored_api = 'https://www.boredapi.com/api/activity/';
let quote_api = 'https://api.quotable.io/quotes/random?maxLength=50';
let ip_api = 'https://api.ipify.org/?format=json';
let weather_api = 'https://api.open-meteo.com/v1/forecast?latitude=-36.7611&longitude=175.4963&current=temperature_2m,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,rain,showers,weather_code,cloud_cover,visibility&timezone=Pacific%2FAuckland';



function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

// API functions

// random joke
async function getJoke(){
  let data = await fetch (joke_api);
  let j_data = await data.json();
  joke = j_data.joke;
}
//things to do when bored
async function getBored(){
  let data = await fetch (bored_api);
  let j_data = await data.json();
  bored = j_data.activity;
}
//random quote
async function getQuote(){
  let data = await fetch(quote_api);
  let j_data = await data.json();
  let result = j_data[0];
  quote = result.content;
}

// IP address
async function getIp(){
  let data = await fetch (ip_api);
  let j_data = await data.json();
  ip = j_data.ip;
}

//Weather (temp and gereration time)
async function getWeather(){
  let data = await fetch (weather_api);
  let j_data = await data.json();
  temp = j_data.current.temperature_2m;
  gentime =j_data.generationtime_ms;
}





function preload(){
  //images and files
  table = loadTable('Sheet1.csv','csv','header');
  mix1 = loadImage ('images/mix1.png');
  mix2 = loadImage ('images/mix2.png');
  mix3 = loadImage ('images/mix3.png');
  horse1 = loadImage('images/horse1.png');
  horse2 = loadImage('images/horse2.png');
  horse3 = loadImage('images/horse2.png');
  horse4 = loadImage('images/horse4.png');


}
function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER)
  imageMode(CENTER)
  pixelDensity(1);
  frameRate(10);
 
  //starting checkbox
  checkbox = createCheckbox();
  checkbox.position(windowWidth/2, windowHeight/2);

  // APIs
  getJoke();
  getBored();
  getQuote();
  getIp();
  getWeather();


  // image opacity 
  tint(255,129);

 //horse array
  imgs.push(horse1);
  imgs.push(horse2);
  imgs.push(horse3);
  imgs.push(horse4);
//resize horse images
  horse4.resize(300,0);
  horse1.resize(300,0);
  horse2.resize(300,0);
  horse3.resize(300,0);

  
}

//graphs from CSV
function show(){

//green graph
  for( x = 0; x < table.getRowCount(); x++){
    let row = table.getRow(x);
    let counticons = row.get("green");
    for (y = 0; y < counticons; y++){
      noStroke();
      fill (64, 179, 72);
       rect( windowWidth/2 - 400 + x * 19, windowHeight/2 + 400 ,8, -counticons *random(0,40));
    }
    }
//Blue graph
    for( x = 0; x < table.getRowCount(); x++){
      let row = table.getRow(x);
      let counticons = row.get("blue");
      for (y = 0; y < counticons; y++){
        noStroke();
        fill (41, 123, 230, 50);
         rect( windowWidth/2 +150 + x * 30, windowHeight/4 + 120 ,20, -counticons * random(0,20));
      }
      }
  
  }

   
  


function draw() {
  background(100);

  // what happens if checkbox is checked
if (checkbox.checked()){
 
  // draw images 
  image(mix3,windowWidth/2,windowHeight/2, 800,800);
  image(mix1,windowWidth/2,windowHeight/2, 800,800);
  image(mix2,windowWidth/2,windowHeight/2, 800,800);

  show();

  // data from APIs

  // text opacity
  fill(255,255,255,100)

  //smaller text
  textSize(50)
  text(joke,windowWidth/2, windowHeight/2 + 200);
  text(bored,windowWidth/2, windowHeight/2 - 100);
  //bigger text
  textSize(100)
  text(quote,windowWidth/2, windowHeight/2 - 100)
  text(ip,windowWidth/2, windowHeight/2 -150)
  text('current temperature:'+temp,windowWidth/2, windowHeight/2 +100)
  text(gentime,windowWidth/2, windowHeight/2)

  // extra text

  text('likes,comments,', windowWidth/2, windowHeight/2, - 200);
  text('4 unread messages',windowWidth/2 -200, windowHeight/2 - 300 );
  text('just posted', windowWidth/2 -80, windowHeight/2+ 290) ;
  text('likes, comments,',windowWidth/2, windowHeight/2 - 330 );
  text('likes, comments,', windowWidth/2, windowHeight/2+ 400);
  text('likes, comments,', windowWidth/2, windowHeight/2-200);
  text('2 unread messages',windowWidth/2, windowHeight/2- 400 );
  
  // minute timer

  let s = second();
  textSize(300);
  fill(255);
  text(s, windowWidth/2, windowHeight/2 - 50);

  // horse images

  let r = random(imgs);
    image(r, windowWidth/2 + 200, windowHeight/2 + 300 );
   
}
  

  
  }
  

  
  
