<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import TheBtn from "./TheBtn.vue";

const router = useRouter();
const route = useRoute();
const keyword = ref(route.query.keyword || "");
const satisfiedLength = ref(true);

const MIN_TITLE_LENGTH = 3;

watch(route, () => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword;
  }
});

const searchMovies = () => {
  if (keyword.value.length < MIN_TITLE_LENGTH) {
    satisfiedLength.value = false;
    return;
  }

  satisfiedLength.value = true;

  if (typeof keyword.value === "string") {
    router.push(`/search?keyword=${keyword.value}`);
  }
};
</script>

<template>
  <div class="movie-input">
    <input
      v-model.trim="keyword"
      placeholder="영어제목으로 검색해주세요."
      @keydown.enter="searchMovies" />
    <TheBtn @click="searchMovies">search</TheBtn>
  </div>
  <div
    v-if="!satisfiedLength"
    class="message">
    3글자 이상을 입력해주세요.
  </div>
</template>

<style scoped lang="scss">
.movie-input {
  max-width: 1024px;
  min-width: 250px;
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
  :deep(.the-btn) {
    border-radius: 40px;
    background-color: white;
    width: 50px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
    .material-symbols-outlined {
      font-size: 30px;
    }
  }
}
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  margin-bottom: 10px;
}
</style>
