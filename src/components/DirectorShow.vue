<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <label for="nombreInput">Nombre</label>
          <input class="u-full-width" type="text" v-model="director.nombre" readonly>
        </div>
        <div class="row">
          <label for="origenInput">Pais de origen</label>
          <input class="u-full-width" type="text" v-model="director.origen" readonly>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="nacimientoInput">Año de Nacimiento</label>
            <input class="u-full-width" type="text" id="nacimiento" v-model="director.nacimiento" readonly />
          </div>
          <div class="six columns">
            <label for="imagenInput">Imagen</label>
            <img :src="'/assets/images/' + director.image">
          </div>
        </div>

        <router-link class="button button-primary" to="/director">Back</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: "Detalles Director",
  data() {
    return {
      title: "Detalles del director",
      director: {}
    }
  },
  mounted() {
    const route = useRoute()
    this.findDirector(route.params.id);
  },
  methods: {
    findDirector: function (id) {
      fetch(this.url + '/.netlify/functions/directorFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.director = items[0];
        })
    }

  }
};
</script>