<template>
  <div class="row" style="margin-top: 5%">
    <div>
      <h3>{{ title }}</h3>
      <form>
        <div class="row">
          <label for="nombreInput">Nombre</label>
          <input class="u-full-width" type="text" v-model="estudio.nombre" readonly>
        </div>
        <div class="row">  
          <div class="six columns">
            <label for="ubicacionInput">Ubicación</label>
            <input class="u-full-width" type="text" v-model="estudio.ubicacion" readonly>
          </div>  
          <div class="six columns">
            <label for="fundacionInput">Año de fundación</label>
            <input class="u-full-width" type="text" v-model="estudio.fundacion" readonly>
          </div>       
        </div>
        <div class="row" style="margin-top: 2%;">
          <div class="six columns" >
            <h5>Peliculas del estudio</h5>
            <table>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Año de lanzamiento</th>
                  <th>Estudio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='movie in movies'>
                  <td>{{ movie.title }}</td>
                  <td>{{ movie.ano_lanzamiento }}</td>
                  <td>{{ movie.estudio }}</td>
                  <td>
                    <router-link class="button" :to="'/movie/show/' + movie.id"
                      style="color: cornflowerblue">Mostrar</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="six columns" style="display: flex; align-items: center; justify-content: center; margin-top: 5%;">
            <img :src="'/assets/images/' + estudio.image" style="border-radius: 10px;" width="400" height="300">
          </div>
        </div>
        <router-link class="button button-primary" to="/studio">Back</router-link>
      </form>
    </div>    
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: "Detalles Estudio",
  data() {
    return {
      title: "Detalles del Estudio",
      estudio: {},
      movies: []
    }
  },
  mounted() {
    const route = useRoute()
    this.findEstudio(route.params.id);
    this.allMovies();
  },
  methods: {
    findEstudio: function (id) {
      fetch(this.url + '/.netlify/functions/studioFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.estudio = items[0];
        })
    },
    allMovies() {
      fetch(this.url + '/.netlify/functions/movieFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.movies = items.filter(movie => movie !== null && movie.estudio === this.estudio.id);
          this.movies.forEach(movie => {
            fetch(this.url + '/.netlify/functions/directorFind/' + movie.director, {
              method: 'GET',
              headers: { 'Accept': 'application/json' }
            })
              .then((response) => response.json())
              .then((directorResult) => {
                movie.director = directorResult[0].nombre;
              })
              .catch((error) => console.error(error));
          });
        })
        .catch((error) => console.error(error));

    }

  }
};
</script>