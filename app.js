const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req ,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  // console.log("post request received");
  const query=req.body.cityName;
const apiKey="007016cacc80ec97dc5101a0838faf8c";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp =weatherData.main.temp;
    const weatherDescription =weatherData.weather[0].description;
    const icon =weatherData.weather[0].icon;
    const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.set("Content-Type","text/html");
    res.write("<h2> the weather is currently  "+weatherDescription+" </h2>");
    res.write("<h1><i>The Temp in "+query+" is " +temp+" Degree Celcius </i></h1>");
    res.write("<img src=" +imageURL +">");
    res.send();
  });
});
})

app.listen(3000,function(){
  console.log("server is running");
  
})