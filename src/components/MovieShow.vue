<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <label for="tituloInput">Titulo</label>
          <input class="u-full-width" type="text" v-model="movie.title" readonly>
        </div>
        <div class="row">
          <label for="sinopsisInput">Sinopsis</label>
          <textarea class="u-full-width" rows="4" cols="50" v-model="movie.sinopsis" readonly></textarea>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="directorInput">Director</label>
            <input class="u-full-width" type="text" id="director" v-model="movie.director" readonly />
          </div>
          <div class="six columns">
            <label for="estudioInput">Estudio</label>
            <input class="u-full-width" type="text" id="estudio" v-model="movie.estudio" readonly />
          </div>
        </div>
        <div class="row">
          <div class="three columns">
            <label for="lanzamientoInput">Año de lanzamiento</label>
            <input class="u-full-width" type="tel" v-model="movie.ano_lanzamiento" readonly>
          </div>
          <div class="six columns">
            <label for="imagenInput">Imagen</label>
            <img :src="'/assets/images/' + movie.img">
          </div>
        </div>

        <router-link class="button button-primary" to="/movie">Back</router-link>
      </form>
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
      movie: {}
    }
  },
  mounted() {
    const route = useRoute()
    this.findMovie(route.params.id);
  },
  methods: {
    findMovie: function (id) {
      fetch(this.url + '/.netlify/functions/movieFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.movie = items[0];
        })
    }

  }
};
</script>