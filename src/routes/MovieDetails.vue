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
        :src="moviesStore.movieDetails.Poster.replace('SX300', 'SY700')" />
      <AltImage v-else />
      <div class="detail-wrapper">
        <div
          v-for="[key, value] in moviesStore.getDetailItem"
          :key="key"
          class="detail-item">
          <span>{{ key }}</span>
          {{ value }}
        </div>
      </div>
    </div>
    <div class="plot-contents">
      <div>{{ moviesStore.movieDetails.Plot }}</div>
      <div>{{ moviesStore.movieDetails.Awards }}</div>
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
  min-width: 250px;
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
    align-items: center;
    margin-bottom: 20px;
    gap: 50px;

    @media screen and (max-width: 650px) {
      flex-direction: column;
      gap: 20px;
    }

    img {
      max-width: 300px;
    }
    .detail-wrapper {
      flex-grow: 1;
      .detail-item {
        border-bottom: 1px solid;
        margin-bottom: 10px;
        span {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.8;
          margin-right: 10px;
        }
      }
    }
  }
  .plot-contents {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
