<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h3>{{ title }}</h3>
      <form>
        <div class="row">
          <label for="nombreInput">Nombre</label>
          <input class="u-full-width" type="text" v-model="director.nombre" readonly>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="origenInput">Pais de origen</label>
            <input class="u-full-width" type="text" v-model="director.origen" readonly>
          </div>
          <div class="six columns">
            <label for="nacimientoInput">Año de Nacimiento</label>
            <input class="u-full-width" type="text" id="nacimiento" v-model="director.nacimiento" readonly />
          </div>
        </div>
        <div class="row" style="margin-top: 2%;">
          <div class="six columns" >
            <h5>Peliculas del director</h5>
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
          <div class="six columns" style="display: flex; align-items: center; justify-content: center;">
            <img :src="'/assets/images/' + director.image" width="350" height="350" alt="Imagen del director" class="imagen-director"> 
          </div>
        </div>
        <router-link class="button button-primary" to="/director">Back</router-link>
      </form>
    </div>
  </div>
</template>
<style>
.imagen-director {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.imagen-director:hover {
  transform: scale(1.1);
}
</style>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Detalles Director",
  data() {
    return {
      title: "Detalles del director",
      director: {},
      movies: []
    }
  },
  mounted() {
    const route = useRoute()
    this.findDirector(route.params.id);
    this.allMovies();
  },
  methods: {
    findDirector: function (id) {
      fetch(this.url + '/.netlify/functions/directorFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.director = items[0];
        })
    },
    allMovies() {
      fetch(this.url + '/.netlify/functions/movieFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.movies = items.filter(movie => movie !== null && movie.director === this.director.id);
          this.movies.forEach(movie => {
            fetch(this.url + '/.netlify/functions/studioFind/' + movie.estudio, {
              method: 'GET',
              headers: { 'Accept': 'application/json' }
            })
              .then((response) => response.json())
              .then((studioResult) => {
                movie.estudio = studioResult[0].nombre;
              })
              .catch((error) => console.error(error));
          });
        })
        .catch((error) => console.error(error));

    }

  }
};
</script>