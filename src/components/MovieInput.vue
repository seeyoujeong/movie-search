<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";

const moviesStore = useMoviesStore();
const router = useRouter();
const route = useRoute();
const title = ref(route.query.s || "");
const flag = ref(false);

const searchMovies = async () => {
  if (title.value.length < 3) {
    flag.value = true;
    return;
  }

  flag.value = false;

  if (typeof title.value === "string") {
    await moviesStore.searchMovies({ s: title.value });
    router.push(`/search?s=${title.value}`);
  }
};
</script>

<template>
  <div class="movie-input">
    <input
      v-model="title"
      placeholder="영어제목으로 검색해주세요."
      @keydown.enter="searchMovies" />
    <button @click="searchMovies">
      <span class="material-symbols-outlined">search</span>
    </button>
  </div>
  <div v-if="flag">3글자 이상을 입력해주세요.</div>
</template>

<style scoped lang="scss">
.movie-input {
  max-width: 1024px;
  margin: 20px auto;
  position: relative;
  height: 50px;
  border: 1px solid black;
  border-radius: 40px;
  input {
    padding: 0 60px 0 25px;
    border: none;
    border-radius: 40px;
    outline: none;
    background-color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 20px;
    font-weight: 500;
    &::placeholder {
      color: #ccc;
    }
  }
  button {
    border: none;
    border-radius: 40px;
    outline: none;
    background-color: white;
    width: 50px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
    cursor: pointer;
  }
  .material-symbols-outlined {
    font-size: 30px;
  }
}
</style>
