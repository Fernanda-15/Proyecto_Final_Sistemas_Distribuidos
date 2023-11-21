"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const movies = [
  {
      "id": 1,
      "title": "Toy Story",
      "sinopsis": "Una historia sobre juguetes que cobran vida cuando los humanos no están presentes...",
      "ano_lanzamiento": 1995,
      "estudio": 1,
      "director": 1,
      "img": "toyStory.jpg"
  },
  {
      "id": 2,
      "title": "Buscando a Nemo",
      "sinopsis": "La búsqueda de un pez payaso llamado Nemo, que se pierde en el océano...",
      "ano_lanzamiento": 2003,
      "estudio": 1,
      "director": 2,
      "img": "nemo.png"
  },
  {
      "id": 3,
      "title": "Shrek",
      "sinopsis": "Las aventuras de Shrek, un ogro verde, y su búsqueda para rescatar a la princesa Fiona...",
      "ano_lanzamiento": 2001,
      "estudio": 2,
      "director": 2,
      "img": "shrek.jpg"
  },
  {
      "id": 4,
      "title": "Los increibles",
      "sinopsis": "Una familia de superhéroes retirados debe unirse para salvar al mundo de un nuevo villano...",
      "ano_lanzamiento": 2004,
      "estudio": 1,
      "director": 4,
      "img": "increibles.jpg"
  },
  {
      "id": 5,
      "title": "Kung Fu Panda",
      "sinopsis": "Un oso panda torpe llamado Po se convierte en el Guerrero Dragón para proteger el Valle de la Paz...",
      "ano_lanzamiento": 2008,
      "estudio": 2,
      "director": 5,
      "img": "panda.jpg"
  },
  {
      "id": 6,
      "title": "Coco",
      "sinopsis": "El joven Miguel se embarca en un viaje en el Día de los Muertos para descubrir su herencia familiar...",
      "ano_lanzamiento": 2017,
      "estudio": 1,
      "director": 4,
      "img": "coco.jpg"
  },
  {
      "id": 7,
      "title": "El rey León",
      "sinopsis": "La historia del joven león Simba y su lucha por reclamar su lugar como rey de la Sabana...",
      "ano_lanzamiento": 1994,
      "estudio": 3,
      "director": 6,
      "img": "rey.jpg"
  },
  {
      "id": 8,
      "title": "Mi villano favorito",
      "sinopsis": "El villano Gru planea robar la luna, pero sus planes cambian cuando adopta a tres niñas huérfanas...",
      "ano_lanzamiento": 2010,
      "estudio": 4,
      "director": 7,
      "img": "villano.jpg"
  },
  {
      "id": 9,
      "title": "Hotel Transylvania",
      "sinopsis": "La película sigue las aventuras del Conde Drácula, quien opera un lujoso hotel para monstruos...",
      "ano_lanzamiento": 2012,
      "estudio": 5,
      "director": 3,
      "img": "hotel.jpg"
  },
  {
      "id": 10,
      "title": "La era de hielo",
      "sinopsis": "Sigue las aventuras de un grupo de personajes prehistóricos en un mundo helado",
      "ano_lanzamiento": 2002,
      "estudio": 6,
      "director": 8,
      "img": "hielo.jpg"
  },
  {
      "id": 11,
      "title": "Robots",
      "sinopsis": "Sigue las aventuras de un joven robot en su búsqueda para conocer a su ídolo, el inventor Bigweld, y enfrentar una conspiración en el mundo de los robots.",
      "ano_lanzamiento": 2005,
      "estudio": 6,
      "director": 8,
      "img": "robots.jpg"
  },
  {
      "id": 12,
      "title": "El reino secreto",
      "sinopsis": "Una niña es transportada a un mundo secreto en el bosque, donde se encuentra en medio de una batalla entre las fuerzas del bien y del mal.",
      "ano_lanzamiento": 2013,
      "estudio": 6,
      "director": 8,
      "img": "epic.jpg"
  },
  {
      "id": 13,
      "title": "Emoji: la película",
      "sinopsis": "Una comedia que tiene lugar dentro del mundo de los emojis en un teléfono inteligente.",
      "ano_lanzamiento": 2017,
      "estudio": 5,
      "director": 7,
      "img": "emoji.jpg"
  },
  {
      "id": 14,
      "title": "Cars",
      "sinopsis": "una película que presenta a vehículos con personalidades y sigue a un automóvil de carreras llamado Rayo McQueen.",
      "ano_lanzamiento": 2006,
      "estudio": 1,
      "director": 1,
      "img": "cars.jpg"
  },
  {
      "id": 15,
      "title": "Ratatouille",
      "sinopsis": "Narra la historia de Remy, una rata con un amor por la cocina que sueña con convertirse en chef.",
      "ano_lanzamiento": 2007,
      "estudio": 1,
      "director": 1,
      "img": "ratatouille.png"
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

	 const n = movies.length;
		
   for(let i = 1; i<=n; i++)
     await redis.set('movie_'+i,JSON.stringify(movies[i-1]));
	 
   await redis.set('movie_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};