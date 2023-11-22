<template>
    <div class="row">
        <div style="margin-top: 3%">
            <h2>{{ title }}</h2>
            <router-link class="button button-primary" to="/estudio/create">Agregar</router-link>
            <table style="margin-top: 1%;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Año de fundación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='estudio in estudios'>
                        <td>{{ estudio.nombre }}</td>
                        <td>{{ estudio.ubicacion }}</td>
                        <td>{{ estudio.fundacion }}</td>
                        <td>
                            <router-link class="button" :to="'/estudio/show/' + estudio.id"
                                style="color: cornflowerblue">Mostrar</router-link>
                            <router-link class="button" :to="'/estudio/edit/' + estudio.id"
                                style="color:rgb(231, 205, 55)">Editar</router-link>
                            <a class="button" v-on:click="deleteEstudio(estudio.id)" style="color:crimson">Eliminar</a>
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
            estudios: [],
            title: 'Lista de estudios'
        }
    },
    methods: {
        allEstudios() {
        fetch(this.url+'/.netlify/functions/studioFindAll',
          { headers: {'Accept': 'application/json'}})
          .then((response) => response.json())
          .then((items) => {
            this.estudios = items;
          })
          .catch((error) => console.error(error));
       },
        deleteEstudio(id) {
         fetch(this.url+'/.netlify/functions/studioDelete/'+id,
           { headers: {'Content-Type': 'application/json'},
             method: 'DELETE'})
            .then((items) => {
              this.allEstudios();
            }
          )
       }
    },
    mounted() {
        this.allEstudios()
    }
}
</script>