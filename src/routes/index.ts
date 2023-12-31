import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./MainPage.vue";
import MovieList from "./MovieList.vue";
import MovieDetails from "./MovieDetails.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainPage,
      children: [
        {
          path: "/search/",
          component: MovieList,
        },
        {
          path: "/details/:id",
          component: MovieDetails,
        },
      ],
    },
  ],
});
