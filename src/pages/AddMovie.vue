<template>
  <div class="get-back">
    <base-button btnStyle="light" @click="getBack()">
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
        <div class="card" v-for="movie in moviesList" @click="addMovie(movie)">
          <img
            :src="
              'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
              movie.poster_path
            "
            alt="Movie Poster"
          />
          <div class="card-content">
            <h2>{{ movie.title }}</h2>
            <p>Release Date: {{ movie.release_date }}</p>
          </div>
        </div>
        <base-dialog backdrop :show="showDialog" @close="toggleDialog">
          <template #header>
            <h3>Adding Movie...</h3>
          </template>
          <template #body>
            <form action="">
              <label for="movieTitle">Movie Title:</label>
              <input
                type="text"
                id="movieTitle"
                v-model="movieToAdd.movieTitle"
                name="movieTitle"
                required
                disabled
              />

              <label for="releaseYear">Release Date:</label>
              <input
                disabled
                v-model="movieToAdd.releaseDate"
                name="releaseDate"
                required
              />

              <label for="overview">Overview:</label>
              <textarea
                v-model="movieToAdd.overview"
                id="overview"
                name="overview"
                rows="4"
                required
              ></textarea>

              <label for="rating">Rating (out of 10):</label>
              <input
                v-model="movieToAdd.rate"
                type="number"
                id="rating"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                required
              />
            </form>
          </template>
          <template #actions>
            <div class="searchMovieActions">
              <base-button @click="addToDb">Add</base-button>
              <base-button @click="toggleDialog" btnStyle="light"
                >Close</base-button
              >
            </div>
          </template>
        </base-dialog>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import searchMovie from "../api/api.js";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";
import useAuthStore from "../store/AuthStore";
import useProfileStore from "../store/ProfileStore.js";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const profileStore = useProfileStore();

const loading = ref(false);
const showDialog = ref(false);

const movieToAdd = ref({
  movieTitle: "",
  releaseDate: "",
  overview: "",
  rate: null,
});

function toggleDialog() {
  showDialog.value = !showDialog.value;
  loading.value = false;
}

const movieName = computed(() => {
  return decodeURIComponent(route.query.search);
});
const moviesList = ref({});

function addMovie(movie) {
  movieToAdd.value.movieTitle = movie.title;
  movieToAdd.value.releaseDate = movie.release_date;
  movieToAdd.value.imgPoster =
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path;

  toggleDialog();
}

async function addToDb() {
  await profileStore.addMovie(movieToAdd.value);
}

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
.search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  max-width: 320px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  cursor: pointer;
}

.card img {
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-content {
  padding: 16px;
}

.card-content h2 {
  margin-top: 0;
  font-size: 1.5em;
}

.card-content p {
  color: #555;
}

.searchMovieActions {
  display: flex;
  gap: 1rem;
}
/* Form styles */
label {
  display: block;
  margin-bottom: 8px;
  color: #252a34;
}

input,
textarea {
  width: 100%;
  padding: 6px;
  margin-bottom: 16px;
  box-sizing: border-box;
  outline: none;
}

/* ---------------------- */
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

@media only screen and (max-width: 768px) {
}

@media only screen and (max-width: 481px) {
}
</style>
