<template>
    <div class="row">
        <div class="eleven column" style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <label for="tituloInput">Titulo</label>
                    <input class="u-full-width" type="text" v-model="movie.title">
                </div>
                <div class="row">
                    <label for="sinopsisInput">Sinopsis</label>
                    <textarea class="u-full-width" rows="4" cols="50" v-model="movie.sinopsis"></textarea>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="directorInput">Director</label>
                        <select class="u-full-width" id="director" v-model="movie.director">
                            <option v-for="(option, index) in director" :key="index" :value="option.id">{{ option.nombre
                            }}</option>
                        </select>
                    </div>
                    <div class="six columns">
                        <label for="estudioInput">Estudio</label>
                        <select class="u-full-width" id="estudio" v-model="movie.estudio">
                            <option v-for="(option2, index) in estudio" :key="index" :value="option2.id">{{
                                option2.nombre }}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="seven columns">
                        <label for="imagenInput">Imagen</label>
                        <input type="file" ref="fileInput" name="image" accept="image/*">
                    </div>
                    <div class="five columns" style="margin-bottom: 2%;">
                        <label for="lanzamientoInput">Año de lanzamiento</label>
                        <input class="u-full-width" type="tel" v-model="movie.ano_lanzamiento">
                    </div>
                    <router-link class="button button-primary" to="/movie">Back</router-link>
                    <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateMovie(movie.id)">Update</a>
                    <a v-if='create' class="button button-primary" style="float: right"
                        v-on:click="createMovie()">Create</a>
                </div>
  
            </form>
        </div>
    </div>
  </template>
    <script>
    import { useRoute } from 'vue-router'
    
    export default {
      name: "Detalles Pelicula",
      props: ['show','edit','create'],
      data() {
        return {
          title: "Detalles de la pelicula",
          movie: {},
          director: [],
          estudio: [],
        }
      },
      mounted() {
        this.loadData();
        const route = useRoute()
        if (route.params.id != null)
          this.findMovie(route.params.id);
        else {
          this.movie = {
            'id': 'movie_'+Math.floor(Math.random()*100000000),'title':'','sinopsis':'',
            'director':0,'estudio':0,'image':'','ano_lanzamiento':0};
        }
      },
      methods: {
        findMovie: function(id) {
          fetch(this.url+'/.netlify/functions/movieFind/'+id,
          { headers: {'Accept': 'application/json'}})
          .then((response) => response.json())
          .then((items) => {
           this.movie = items[0];
          })
        },
        updateMovie: function(id) {
          fetch(this.url+'/.netlify/functions/movieUpdate/'+id,
            { headers: {'Content-Type':'application/json'},
              method: 'PUT',
              body: JSON.stringify(this.movie)})
            .then((data) => {
              this.$router.push('/movie');
            }
          )
        },
        createMovie: function() {
          console.log("Movie", this.movie);
          fetch(this.url+'/.netlify/functions/movieInsert',
            { headers: {'Content-Type':'application/json'},
              method: 'POST',
              body: JSON.stringify(this.movie)})
            .then((data) => {
               this.$router.push('/movie');
            }
          )
          .catch((error) => {
          console.error('Error:', error);
            });
        },
        loadData() {
          fetch(this.url+'/.netlify/functions/directorFindAll', {
              method: 'GET',
              headers: { 'Accept': 'application/json' }
          })
              .then((response) => response.json())
              .then((result) => {
                  this.director = result;
              });
  
          fetch(this.url+'/.netlify/functions/studioFindAll', {
              method: 'GET',
              headers: { 'Accept': 'application/json' }
          })
              .then((response) => response.json())
              .then((result) => {
                  this.estudio = result;
              });
        }
      }
    };
    </script>