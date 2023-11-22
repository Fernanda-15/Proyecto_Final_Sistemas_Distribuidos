<template>
    <div class="row">
        <div style="margin-top: 3%">
            <h2>{{ title }}</h2>
            <router-link class="button button-primary" to="/director/create">Agregar</router-link>
            <table style="margin-top: 1%;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Pais de Origen</th>
                        <th>Año de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='director in directores'>
                        <td>{{ director.nombre }}</td>
                        <td>{{ director.origen }}</td>
                        <td>{{ director.nacimiento }}</td>
                        <td>
                            <router-link class="button" :to="'/director/show/' + director.id"
                                style="color: cornflowerblue">Mostrar</router-link>
                            <router-link class="button" :to="'/director/edit/' + director.id"
                                style="color:rgb(231, 205, 55)">Editar</router-link>
                            <a class="button" v-on:click="deleteDirector(director.id)" style="color:crimson">Eliminar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            directores: [],
            title: 'Lista de directores'
        }
    },
    methods: {
        allDirectores() {
        fetch(this.url+'/.netlify/functions/directorFindAll',
          { headers: {'Accept': 'application/json'}})
          .then((response) => response.json())
          .then((items) => {
            this.movies = items;
          })
          .catch((error) => console.error(error));
       },
        deleteDirector(id) {
         fetch(this.url+'/.netlify/functions/directorDelete/'+id,
           { headers: {'Content-Type': 'application/json'},
             method: 'DELETE'})
            .then((items) => {
              this.allDirectores();
            }
          )
       }
    },
    mounted() {
        this.allDirectores()
    }
}
</script>