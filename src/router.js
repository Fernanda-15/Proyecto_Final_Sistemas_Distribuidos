import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import MovieIndex from "./components/MovieIndex.vue";
import MovieDetails from "./components/MovieDetails.vue";
import MovieShow from "./components/MovieShow.vue";
import DirectorIndex from "./components/DirectorIndex.vue";
import DirectorShow from "./components/DirectorShow.vue";
import DirectorDetails from "./components/DirectorDetails.vue";
import EstudioIndex from "./components/EstudioIndex.vue";
import EstudioShow from "./components/EstudioShow.vue";
import EstudioDetails from "./components/EstudioDetails.vue";

const routes = [
  { path: "/", component: Home },

  { path: "/movie", component: MovieIndex },
  { path: "/director", component: DirectorIndex },
  { path: "/director/show/:id", component: DirectorShow},  
  { path: "/director/edit/:id", component: DirectorDetails, props: {edit:true} },
  { path: "/director/create", component: DirectorDetails, props: {create:true} },
  { path: "/studio", component: EstudioIndex },
  { path: "/estudio/show/:id", component: EstudioShow},  
  { path: "/estudio/edit/:id", component: EstudioDetails, props: {edit:true} },
  { path: "/estudio/create", component: EstudioDetails, props: {create:true} },
  { path: "/movie/show/:id", component: MovieShow},
  { path: "/movie/edit/:id", component: MovieDetails, props: {edit:true} },
  { path: "/movie/create", component: MovieDetails, props: {create:true} },
  { path: "/movie/delete/:id", component: MovieDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;