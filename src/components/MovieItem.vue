<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Movie } from "~/store/movies";
import ReplaceImg from "./ReplaceImg.vue";

defineProps<{
  movies: Movie[];
}>();
const router = useRouter();

const showMovieDetails = async (id: string) => {
  router.push(`/details/${id}`);
};
</script>

<template>
  <li
    v-for="movie in movies"
    :key="movie.imdbID"
    class="movie-item"
    @click="showMovieDetails(movie.imdbID)">
    <div
      v-if="movie.Poster !== 'N/A'"
      class="img-wrapper"
      :style="{
        backgroundImage: `url(${movie.Poster})`,
      }">
      <div class="title-wrapper">
        {{ movie.Title }}
      </div>
    </div>
    <ReplaceImg
      v-else
      class="img-wrapper">
      <div class="title-wrapper">
        {{ movie.Title }}
      </div>
    </ReplaceImg>
  </li>
</template>

<style scoped lang="scss">
.movie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .img-wrapper {
    position: relative;
    width: 100%;
    max-width: 340px;
    height: 400px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    border-radius: 10px 10px 0 0;
    border: 1px solid #ccc;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.04);
    }
  }
  .title-wrapper {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: rgba(#000, 0.7);
    height: 30px;
    line-height: 2;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
