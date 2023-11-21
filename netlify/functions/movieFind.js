"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    const id = event.path.split("/").reverse()[0];
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });

   const movie = await redis.get('movie_'+id);
   let movies = [];
   movies.push(movie);
   movies.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(movies)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};