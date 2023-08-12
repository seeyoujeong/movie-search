<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";
import TheLoader from "~/components/TheLoader.vue";
import MovieItem from "~/components/MovieItem.vue";

const moviesStore = useMoviesStore();
const router = useRouter();
const route = useRoute();
const pageNum = ref(parseInt(String(route.query.page)) || 1);

if (route.query.s) {
  moviesStore.searchMovies({
    s: String(route.query.s),
    page: pageNum.value,
  });
}

const showMovieList = async (move: "prev" | "next") => {
  if (!route.query.page) pageNum.value = 1;
  switch (move) {
    case "prev":
      if (pageNum.value < 2) return;
      pageNum.value -= 1;
      break;
    case "next":
      if (moviesStore.movies.Search.length !== 10) return;
      pageNum.value += 1;
      break;
    default:
      throw new Error("showMovieList Error");
  }
  await moviesStore.searchMovies({
    s: String(route.query.s),
    page: pageNum.value,
  });
  router.push(`/search?s=${route.query.s}&page=${pageNum.value}`);
};
</script>

<template>
  <TheLoader v-if="moviesStore.loading" />
  <div
    v-else
    class="movie-list">
    <div class="total-results">
      검색 결과 개수: {{ moviesStore.movies.totalResults }}
    </div>
    <ul v-if="moviesStore.movies.Response === 'True'">
      <MovieItem :movies="moviesStore.movies.Search" />
      <div class="btn-wrapper">
        <button
          class="prev-btn"
          @click="showMovieList('prev')">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button
          class="next-btn"
          @click="showMovieList('next')">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </ul>
    <div v-else-if="moviesStore.movies.Response === 'False'">
      제목과 일치하는 영화가 없습니다.
    </div>
    <div v-else>영화를 검색해보세요.</div>
  </div>
</template>

<style scoped lang="scss">
.movie-list {
  max-width: 1024px;
  margin: auto;
  .total-results {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 15px;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    .btn-wrapper {
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 30px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      button {
        border: none;
        outline: none;
        color: white;
        font-size: 36px;
        background-color: rgba(0, 0, 0, 0.3);
        width: 58px;
        height: 58px;
        cursor: pointer;
      }
      .prev-btn {
        border-radius: 0 50% 50% 0;
      }
      .next-btn {
        border-radius: 50% 0 0 50%;
      }
    }
  }
}
</style>
