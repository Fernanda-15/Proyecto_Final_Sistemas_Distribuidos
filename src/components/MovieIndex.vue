<template>
    <div class="row">
      <div style="margin-top: 3%">
            <h2>{{ title }}</h2>
            <router-link class="button button-primary" to="/movie/create">Agregar</router-link>
            <table style="margin-top: 1%;">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Año de lanzamiento</th>
                        <th>Estudio</th>
                        <th>Director</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='movie in movies'>
                        <td>{{ movie.title }}</td>
                        <td>{{ movie.ano_lanzamiento }}</td>
                        <td>{{ movie.estudio }}</td>
                        <td>{{ movie.director }}</td>
                        <td>
                            <router-link class="button" :to="'/movie/show/' + movie.id"
                                style="color: cornflowerblue">Mostrar</router-link>
                            <router-link class="button" :to="'/movie/edit/' + movie.id"
                                style="color:rgb(231, 205, 55)">Editar</router-link>
                            <a class="button" v-on:click="deleteMovie(movie.id)" style="color:crimson">Eliminar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "Movie Index",
    data() {
      return {
        title: 'Lista de peliculas',
        movies: []
      };
    },
    mounted() {
      this.allMovies()
    },
    methods: {
      allMovies() {
        fetch(this.url+'/.netlify/functions/movieFindAll',
          { headers: {'Accept': 'application/json'}})
          .then((response) => response.json())
          .then((items) => {
            this.movies = items.filter(movie => movie !== null);
            const promiseDirector = this.movies.map((movie) =>
                        fetch(this.url+'/.netlify/functions/directorFind/' + movie.director, {
                            method: 'GET',
                            headers: { 'Accept': 'application/json' }
                        })
                            .then((response) => response.json())
                            .then((directorResult) => {
                                movie.director = directorResult[0].nombre;

                            })
                    );
                    const promiseStudio = this.movies.map((movie) =>
                        fetch(this.url+'/.netlify/functions/studioFind/' + movie.estudio, {
                            method: 'GET',
                            headers: { 'Accept': 'application/json' }
                        })
                            .then((response) => response.json())
                            .then((studioResult) => {
                                movie.estudio = studioResult[0].nombre;

                            })
                    );

                    return Promise.all([promiseDirector, promiseStudio]);
          })
          .catch((error) => console.error(error));
       },
       deleteMovie(id) {
         fetch(this.url+'/.netlify/functions/movieDelete/'+id,
           { headers: {'Content-Type': 'application/json'},
             method: 'DELETE'})
            .then((items) => {
              this.allMovies();
            }
          )
       }
    }
  };
  </script>