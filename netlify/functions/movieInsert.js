"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');
const fs = require('fs');
const path = require('path');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });
   
   const data = JSON.parse(event.body);
   const imageFileName = `movie_${data.id}.jpg`;
   const imagePath = path.join(__dirname, 'public', 'assets', 'images', imageFileName);

   await redis.set('movie_'+data.id,JSON.stringify({ ...data, img: imageFileName }));
   await redis.incr('movie_N');
      
    fs.writeFileSync(imagePath, data.img, 'base64');
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};