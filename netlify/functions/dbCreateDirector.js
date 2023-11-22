"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const director = [
  {
      "id": 1,
      "nombre": "John Lasseter",
      "origen": "USA",
      "nacimiento": 1957,
      "image": "johnLasseter.png"
  },
  {
      "id": 2,
      "nombre": "Andrew Stanton",
      "origen": "USA",
      "nacimiento": 1965,
      "image": "andrewStanton.jpg"
  },
  {
      "id": 3,
      "nombre": "Genndy Tartakovsky",
      "origen": "",
      "nacimiento": 1966,
      "image": "genndyTartakovsky.jpg"
  },
  {
      "id": 4,
      "nombre": "Lee Unkrich",
      "origen": "USA",
      "nacimiento": 1967,
      "image": "leeUnkrich.jpg"
  },
  {
      "id": 5,
      "nombre": "Mark Osborne",
      "origen": "USA",
      "nacimiento": 1970,
      "image": "markOsborne.jpg"
  },
  {
      "id": 6,
      "nombre": "Roger Allers",
      "origen": "USA",
      "nacimiento": 1949,
      "image": "rogerAllers.jpg"
  },
  {
      "id": 7,
      "nombre": "Pierre Coffin",
      "origen": "Francia",
      "nacimiento": 1967,
      "image": "pierreCoffin.jpg"
  },
  {
      "id": 8,
      "nombre": "Chris Wedge",
      "origen": "USA",
      "nacimiento": 1957,
      "image": "chrisWedge.jpg"
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

	 const n = director.length;
		
   for(let i = 1; i<=n; i++)
     await redis.set('director_'+i,JSON.stringify(director[i-1]));
	 
   await redis.set('director_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};