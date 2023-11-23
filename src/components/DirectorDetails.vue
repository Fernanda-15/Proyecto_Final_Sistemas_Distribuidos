<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <label for="nombreInput">Nombre</label>
          <input class="u-full-width" type="text" v-model="director.nombre">
        </div>
        <div class="row">
          <label for="origenInput">Pais de origen</label>
          <input class="u-full-width" type="text" v-model="director.origen">
        </div>
        <div class="row">
          <div class="six columns">
            <label for="nacimientoInput">Año de Nacimiento</label>
            <input class="u-full-width" type="text" id="nacimiento" v-model="director.nacimiento" />
          </div>
          <div class="six columns">
            <label for="imagenInput">Imagen</label>
            <input type="file" ref="fileInput" name="image" accept="image/*">
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/director">Back</router-link>
          <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateDirector(director.id)">Update</a>
          <a v-if='create' class="button button-primary" style="float: right" v-on:click="createDirector()">Create</a>
        </div>

      </form>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: "Datos Director",
  props: ['edit', 'create'],
  data() {
    return {
      title: "Datos del director",
      director: {},
      director_n: 0
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findDirector(route.params.id);
    else {
      fetch(this.url + '/.netlify/functions/getdirectorN', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((result) => {
          this.director_n = +result.director_N + 1;
          this.director = {
            'id':this.director_n, 'nombre': '', 'origen': '',
            'nacimiento': 0};
        });

    }
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
    updateDirector: function (id) {
      fetch(this.url + '/.netlify/functions/directorUpdate/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify(this.director)
        })
        .then((data) => {
          this.$router.push('/director');
        }
        )
    },
    createDirector: function () {
      fetch(this.url + '/.netlify/functions/directorInsert',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(this.director)
        })
        .then((data) => {
          this.$router.push('/director');
        }
        )
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
};
</script>