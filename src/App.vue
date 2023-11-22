<template>
    <div id="app" class="container">
      <div class="row"  style="margin-top: 15px">
        <router-link class="three columns button button-primary" 
          to="/">Home</router-link>
        <router-link class="three columns button button-primary" 
          to="/movie">Peliculas</router-link>
        <router-link class="three columns button button-primary" 
          to="/director">Directores</router-link>
        <router-link class="three columns button button-primary" 
          to="/studio">Estudios</router-link>
      </div>
     <router-view />
      <div class="row">
        <button disabled="disabled" class="twelve columns button-primary">
          Copyright (c) 2022 - Maria Fernanda Quesada Pineda
        </button>
      </div>
    </div>
    </template>
    
    <script>
    export default {
      name: "App",
    };
    </script>