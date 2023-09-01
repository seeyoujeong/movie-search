<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Movie } from "~/store/movies";
import ThePoster from "./ThePoster.vue";

defineProps<{
  movies: Movie[];
}>();

const router = useRouter();

const showMovieDetails = (id: string) => {
  router.push(`/details/${id}`);
};
</script>

<template>
  <li
    v-for="movie in movies"
    :key="movie.imdbID"
    class="movie-item"
    @click="showMovieDetails(movie.imdbID)">
    <ThePoster :poster="movie.Poster.replace('SX300', 'SY700')">
      <div class="title-wrapper">
        {{ movie.Title }}
      </div>
    </ThePoster>
  </li>
</template>

<style scoped lang="scss">
.movie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  :deep(.img-wrapper) {
    position: relative;
    width: 100%;
    max-width: 340px;
    height: 400px;
  }
  .title-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    color: #fff;
    background-color: rgba(#000, 0.7);
    line-height: 2;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
