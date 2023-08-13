<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";
import TheLoader from "~/components/TheLoader.vue";
import MovieItem from "~/components/MovieItem.vue";
import TheBtn from "~/components/TheBtn.vue";

const moviesStore = useMoviesStore();
const router = useRouter();
const route = useRoute();
const pageNum = ref(parseInt(String(route.query.page)) || 1);

const MIN_PAGE_NUM = 2;
const MAX_MOVIE_LIST = 10;

const loadMovieList = async () => {
  if (route.query.s) {
    await moviesStore.searchMovies({
      s: String(route.query.s),
      page: parseInt(String(route.query.page)) || 1,
    });
  }
};

const showMovieList = async (move: "prev" | "next") => {
  if (!route.query.page) pageNum.value = 1;
  switch (move) {
    case "prev":
      if (pageNum.value < MIN_PAGE_NUM) return;
      pageNum.value -= 1;
      break;
    case "next":
      if (moviesStore.movies.Search.length !== MAX_MOVIE_LIST) return;
      pageNum.value += 1;
      break;
    default:
      throw new Error("showMovieList Error");
  }
  router.push(`/search?s=${route.query.s}&page=${pageNum.value}`);
};

loadMovieList();

watch(route, async () => {
  await loadMovieList();
});
</script>

<template>
  <TheLoader v-if="moviesStore.loading" />
  <div
    v-else
    class="movie-list">
    <div class="total-results">
      검색 결과 개수: {{ moviesStore.movies.totalResults || 0 }}
    </div>
    <ul v-if="moviesStore.movies.Response === 'True'">
      <MovieItem :movies="moviesStore.movies.Search" />
      <div class="btn-wrapper">
        <TheBtn
          class="prev-btn"
          @click="showMovieList('prev')">
          arrow_back_ios_new
        </TheBtn>
        <TheBtn
          class="next-btn"
          @click="showMovieList('next')">
          arrow_forward_ios
        </TheBtn>
      </div>
    </ul>
    <div v-else-if="moviesStore.movies.Response === 'False'">
      제목과 일치하는 영화가 없습니다.
    </div>
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
    min-width: 200px;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    .btn-wrapper {
      max-width: 1200px;
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
      :deep(.the-btn) {
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        width: 58px;
        height: 58px;
      }
      .prev-btn,
      .next-btn {
        border-radius: 50%;
      }
      @media screen and (max-width: 1214px) {
        .prev-btn {
          border-radius: 0 50% 50% 0;
        }
        .next-btn {
          border-radius: 50% 0 0 50%;
        }
      }
    }
  }
}
</style>
