<template>
  <div class="row" style="margin-top: 5%">
    <div class="seven columns" >
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <label for="nombreInput">Nombre</label>
          <input class="u-full-width" type="text" v-model="estudio.nombre" readonly>
        </div>
        <div class="row">
          <label for="ubicacionInput">Ubicación</label>
          <input class="u-full-width" type="text" v-model="estudio.ubicacion" readonly>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="fundacionInput">Año de fundación</label>
            <input class="u-full-width" type="text" v-model="estudio.fundacion" readonly>
          </div>          
        </div>

        <router-link class="button button-primary" to="/studio">Back</router-link>
      </form>
    </div>
    <div class="five columns" style="display: flex; align-items: center; justify-content: center; margin-top: 5%">
      <img :src="'/assets/images/' + estudio.image" style="border-radius: 10px;" width="300" height="200">
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
      estudio: {}
    }
  },
  mounted() {
    const route = useRoute()
    this.findEstudio(route.params.id);
  },
  methods: {
    findEstudio: function (id) {
      fetch(this.url + '/.netlify/functions/studioFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.estudio = items[0];
        })
    }

  }
};
</script>