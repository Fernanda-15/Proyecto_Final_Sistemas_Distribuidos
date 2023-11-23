<template>
  <div class="row" style="margin-top: 5%">
    <div class="seven columns" >
      <h3>{{ title }}</h3>
      <form>
        <div class="row">
          <label for="tituloInput">Titulo</label>
          <input class="u-full-width" type="text" v-model="movie.title" readonly>
        </div>
        <div class="row">
          <label for="sinopsisInput">Sinopsis</label>
          <textarea class="u-full-width" rows="10" cols="50" v-model="movie.sinopsis" readonly></textarea>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="directorInput">Director</label>
            <input class="u-full-width" type="text" id="director" v-model="director" readonly />
          </div>
          <div class="six columns">
            <label for="estudioInput">Estudio</label>
            <input class="u-full-width" type="text" id="estudio" v-model="studio" readonly />
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="lanzamientoInput">Año de lanzamiento</label>
            <input class="u-full-width" type="tel" v-model="movie.ano_lanzamiento" readonly>
          </div>          
        </div>
        <li><router-link :to="'/director/show/' + movie.director">Información de&nbsp; {{ director }}</router-link></li>
        <li><router-link :to="'/estudio/show/' + movie.estudio">Información de &nbsp;{{ studio }}</router-link></li>
        <router-link class="button button-primary" to="/movie">Back</router-link>
      </form>
    </div>
    <div class="five columns" style="display: flex; align-items: center; justify-content: center;">
            <img :src="'/assets/images/' + movie.img" style="border-radius: 10px;" width="400" height="500">
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: "Detalles Pelicula",
  data() {
    return {
      title: "Detalles de la pelicula",
      movie: {},
      studio: '',
      director: ''
    }
  },
  mounted() {
    const route = useRoute()
    this.findMovie(route.params.id);
  },
  methods: {
    findMovie: function (id) {
      fetch(this.url + '/.netlify/functions/movieFind/' + id, {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.movie = items[0];
          fetch(this.url + '/.netlify/functions/directorFind/' + this.movie.director, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          })
            .then((response) => response.json())
            .then((result) => {
              this.director = result[0].nombre;
            })
            .catch((error) => {
              console.error('Error fetching director data:', error);
            });

          fetch(this.url + '/.netlify/functions/studioFind/' + this.movie.estudio, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          })
            .then((response) => response.json())
            .then((result) => {
              this.studio = result[0].nombre;
            })
            .catch((error) => {
              console.error('Error fetching studio data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });

    }

  }
};
</script>