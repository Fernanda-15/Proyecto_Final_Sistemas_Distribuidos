<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <label for="nombreInput">Nombre</label>
          <input class="u-full-width" type="text" v-model="estudio.nombre">
        </div>
        <div class="row">
          <label for="ubicacionInput">Ubicación</label>
          <input class="u-full-width" type="text" v-model="estudio.ubicacion">
        </div>
        <div class="row">
          <div class="six columns">
            <label for="fundacionInput">Año de fundación</label>
            <input class="u-full-width" type="text" v-model="estudio.fundacion">
          </div>
          <div class="six columns">
            <label for="imagenInput">Imagen</label>
            <img :src="'/assets/images/' + estudio.image">
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/studio">Back</router-link>
          <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateEstudio(estudio.id)">Update</a>
          <a v-if='create' class="button button-primary" style="float: right" v-on:click="createEstudio()">Create</a>
        </div>

      </form>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: "Datos Estudio",
  props: ['edit', 'create'],
  data() {
    return {
      title: "Datos del Estudio",
      estudio: {},
      estudio_n: 0
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findEstudio(route.params.id);
    else {
      fetch(this.url + '/.netlify/functions/getStudioN', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((result) => {
          this.estudio_n = +result.studio_N + 1;
          this.estudio = {
            'id': this.estudio_n, 'nombre': '', 'ubicacion': '',
            'fundacion': 0};
        });

    }
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
    updateEstudio: function (id) {
      fetch(this.url + '/.netlify/functions/studioUpdate/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify(this.estudio)
        })
        .then((data) => {
          this.$router.push('/studio');
        }
        )
    },
    createEstudio: function () {
      fetch(this.url + '/.netlify/functions/studioInsert',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(this.estudio)
        })
        .then((data) => {
          this.$router.push('/studio');
        }
        )
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
};
</script>