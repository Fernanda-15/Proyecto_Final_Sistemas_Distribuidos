import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import MovieIndex from "./components/MovieIndex.vue";
import MovieDetails from "./components/MovieDetails.vue";

const routes = [
  { path: "/", component: Home },

  { path: "/movie", component: MovieIndex },
  { path: "/movie/show/:id", 
    component: MovieDetails, props: {show:true} },
  { path: "/movie/edit/:id", 
    component: MovieDetails, props: {edit:true} },
  { path: "/movie/create", 
    component: MovieDetails, props: {create:true} },
  { path: "/movie/delete/:id", 
    component: MovieDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;