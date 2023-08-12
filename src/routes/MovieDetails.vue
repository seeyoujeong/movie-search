<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";
import TheLoader from "~/components/TheLoader.vue";
import AltImage from "~/components/AltImage.vue";

const moviesStore = useMoviesStore();
const route = useRoute();

if (typeof route.params.id === "string") {
  moviesStore.searchMovieDetails({ i: route.params.id });
}
</script>

<template>
  <TheLoader v-if="moviesStore.loading" />
  <div
    v-else
    class="movie-details">
    <div class="title-contents">
      <div class="title-area">
        <div class="title">{{ moviesStore.movieDetails.Title }}</div>
        <div class="year-runtime">
          <div>{{ moviesStore.movieDetails.Year }}</div>
          <div>{{ moviesStore.movieDetails.Runtime }}</div>
        </div>
      </div>
      <div class="rating-area">
        <div class="rating">{{ moviesStore.movieDetails.imdbRating }}</div>
        <div class="rated">{{ moviesStore.movieDetails.Rated }}</div>
      </div>
    </div>
    <div class="details-contents">
      <img
        v-if="moviesStore.movieDetails.Poster !== 'N/A'"
        :src="moviesStore.movieDetails.Poster" />
      <AltImage v-else />
      <div class="info">
        <div>Genre: {{ moviesStore.movieDetails.Genre }}</div>
        <div>Country: {{ moviesStore.movieDetails.Country }}</div>
        <div>Released: {{ moviesStore.movieDetails.Released }}</div>
        <div>Director: {{ moviesStore.movieDetails.Director }}</div>
        <div>Writer: {{ moviesStore.movieDetails.Writer }}</div>
        <div>Actors: {{ moviesStore.movieDetails.Actors }}</div>
      </div>
    </div>
    <div class="plot-contents">
      <div>{{ moviesStore.movieDetails.Plot }}</div>
      <div>Awards: {{ moviesStore.movieDetails.Awards }}</div>
      <div
        v-for="rating in moviesStore.movieDetails.Ratings"
        :key="rating.Source">
        {{ rating.Source }}
        {{ rating.Value }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-details {
  max-width: 1024px;
  margin: auto;
  margin-top: 30px;
  .title-contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title-area {
      .title {
        font-size: 32px;
        font-weight: 700;
      }
      .year-runtime {
        display: flex;
        gap: 10px;
      }
    }
    .rating-area {
      display: flex;
      align-items: center;
      gap: 10px;
      .rating {
        font-size: 28px;
        font-weight: 700;
      }
      .rated {
        font-weight: 500;
      }
    }
  }
  .details-contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 50px;

    @media screen and (max-width: 650px) {
      flex-direction: column;
      gap: 20px;
    }
    .info {
      flex-grow: 1;
      font-size: 18px;
      line-height: 1.8;
    }
  }
  .plot-contents {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>