const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
    // res.send("Server is ok");
})

app.post("/",function(req,res){
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "622d0af07477b3a8ac63c2bc3f5ec50d";
    const unit = "metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            //we cannot use res.send in a get function more than once.
            res.write("<h1>The temperature in London is "+temp+" degree celcius</h1>");
            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    });
})


app.listen(3000,function(){
    console.log("Server is running");
})