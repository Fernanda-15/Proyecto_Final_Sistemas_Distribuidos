"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const studios = [
  {
      "id": 1,
      "nombre": "Pixar Animation Studios",
      "ubicacion": "Emeryville, California",
      "fundacion": 1986,
      "image": "pixar.png"
  },
  {
      "id": 2,
      "nombre": "DreamWorks Animation",
      "ubicacion": "Glendale, California",
      "fundacion": 1944,
      "image": "dreamWorks.png"
  },
  {
      "id": 3,
      "nombre": "Walt Disney Animation Studios",
      "ubicacion": "Burbank, California",
      "fundacion": 1923,
      "image": "waltDisney.png"
  },
  {
      "id": 4,
      "nombre": "Ilumination Entretainment",
      "ubicacion": "Santa Mónica, California",
      "fundacion": 2007,
      "image": "illumination.jpg"
  },
  {
      "id": 5,
      "nombre": "Sony Pictures Animation",
      "ubicacion": "Culver City, California",
      "fundacion": 2002,
      "image": "sony.jpg"
  },
  {
      "id": 6,
      "nombre": "Blue Sky Studios",
      "ubicacion": "Greenwich, Connecticut",
      "fundacion": 1987,
      "image": "blue.png"
  }
];

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });

	 const n = studios.length;
		
   for(let i = 1; i<=n; i++)
     await redis.set('studio_'+i,JSON.stringify(studios[i-1]));
	 
   await redis.set('studio_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};