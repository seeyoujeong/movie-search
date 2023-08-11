<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";
import TheLoader from "./TheLoader.vue";
import ReplaceImg from "./ReplaceImg.vue";

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

const showMovieDetails = async (id: string) => {
  router.push(`/details/${id}`);
};
const showPrevMovieList = async () => {
  if (pageNum.value < 2) return;
  if (!route.query.page) pageNum.value = 1;
  pageNum.value -= 1;
  await moviesStore.searchMovies({
    s: String(route.query.s),
    page: pageNum.value,
  });
  router.push(`/search?s=${route.query.s}&page=${pageNum.value}`);
};
const showNextMovieList = async () => {
  if (moviesStore.movies.Search.length !== 10) return;
  if (!route.query.page) pageNum.value = 1;
  pageNum.value += 1;
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
      <li
        v-for="movie in moviesStore.movies.Search"
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
      <div class="btn-wrapper">
        <button
          class="left-btn"
          @click="showPrevMovieList">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button
          class="right-btn"
          @click="showNextMovieList">
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
      .left-btn {
        border-radius: 0 50% 50% 0;
      }
      .right-btn {
        border-radius: 50% 0 0 50%;
      }
    }
  }
}
</style>
