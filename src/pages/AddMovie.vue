<template>
  <div class="get-back">
    <base-button btnStyle="light" @click="getBack">
      <font-awesome-icon
        icon="fa-solid fa-left-long"
        class="back-logo"
        size="xl"
      />
      Get Back
    </base-button>
  </div>

  <div class="container">
    <h1>Search Result of "{{ movieName }}"</h1>
    <section class="result-section">
      <h4 v-if="false" class="no-result">No Movie Found</h4>
      <div else class="search-results">
        <div class="result-item" v-for="movie in moviesList">
          <div class="moviePoster">
            <img
              class="movie-poster"
              :src="
                'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
                movie.poster_path
              "
              alt="poster"
            />
          </div>
          <div class="movie-info">
            <p>
              <span class="info-key">Title:</span>
              <span class="title">&nbsp {{ movie.original_title }}</span>
            </p>
            <p>
              <span class="info-key">Release Date:</span>
              <span class="release-date"> &nbsp{{ movie.release_date }}</span>
            </p>
            <p>
              <span class="info-key">Overview:</span>
              <span class="overview">&nbsp {{ movie.overview }} </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import searchMovie from "../api/api.js";
import BaseButton from "../components/ui/BaseButton.vue";
import useAuthStore from "../store/AuthStore";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const movieName = computed(() => {
  return decodeURIComponent(route.query.search);
});
const moviesList = ref({});

onMounted(async () => {
  try {
    const response = await searchMovie(movieName.value);
    moviesList.value = response.results;
  } catch (err) {
    console.log(err);
  }
});
function getBack() {
  router.push({
    name: "userProfile",
    params: { username: authStore.getUsername },
  });
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 1rem auto;
  text-align: center;
}
.back-logo {
  color: #252a34;
}
.get-back {
  display: flex;
  position: sticky;
  top: 1rem;
  left: 1rem;
}

.container h1 {
  margin-bottom: 3rem;
}
.no-result {
  color: #ff2e63;
}
/* Search Results */

.result-item {
  background-color: #d9d9d9;
  border: 1px solid #7a7f89;
  border-radius: 8px;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 0 7px rgba(37, 42, 52, 0.4);
  width: 75%;
  margin: 1rem auto;
}
.movie-poster {
  width: 120px;
  height: 180px;
}
.movie-info {
  text-align: left;
}
.movie-info .info-key {
  color: #252a34;
  font-weight: bold;
}
.movie-info .title {
  color: #ff2e63;
  font-weight: bold;
}
.movie-info .release-date {
  font-weight: bold;
  color: #474c56;
}
.movie-info .overview {
  font-size: 0.9rem;
  color: #252a34;
}

@media only screen and (max-width: 768px) {
  .container h1 {
    font-size: 2rem;
  }
  .result-item {
    width: 100%;
  }
}
@media only screen and (max-width: 481px) {
  .container {
    margin: 0;
  }
  .container h1 {
    font-size: 1.25rem;
  }

  .movie-poster {
    width: 90px;
    height: 135px;
  }
  .movie-info .overview {
    font-size: 0.8rem;
  }
  .result-item {
    width: auto;
    position: relative;
    display: flex;
    align-items: center;
  }
}
</style>
