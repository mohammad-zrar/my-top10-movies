<template>
  <header>
    <h1 id="username">{{ profileData.profile.username }}</h1>
    <p>Welcome to my top 10 favorite movie pinner profile ❤</p>
  </header>
  <section class="actions">
    <base-button v-if="isAdmin" @click="toggleDialog"
      >Add movie to your list</base-button
    >
    <select class="select-sort" name="sort" id="sort">
      <option value="asc">Ascending Order</option>
      <option value="desc">Descending Order</option>
    </select>
  </section>
  <section class="movies-list">
    <flip-card
      v-for="(movie, key, index) in profileData.profile.movies"
      :title="movie.movieTitle"
      :year="movie.year"
      :overview="movie.overview"
      :rating="movie.rate"
      :imgPoster="movie.imgPoster"
      :index="index"
      :key="key"
    />
  </section>
  <base-dialog :backdrop="false" :show="showDialog" @close="toggleDialog">
    <template #header>
      <h3>Adding Movie...</h3>
    </template>
    <template #body>
      <div class="addMovieDialog">
        <label for="movieSearchInput">Search Movie by Name</label>
        <input
          type="text"
          id="movieSearchInput"
          placeholder="Enter movie name"
          v-model="searchMovieInput"
        />
      </div>
    </template>
    <template #actions>
      <div class="searchMovieActions">
        <base-button @click="searchMovie">Search</base-button>
        <base-button @click="toggleDialog" btnStyle="light">Close</base-button>
      </div>
    </template>
  </base-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// STORES
import useProfileStore from "../store/ProfileStore.js";
import useAuthStore from "../store/AuthStore.js";
// COMPONENTS
import FlipCard from "../components/FlipCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";

// ---- COMPOSABLES ---- //
const router = useRouter();
const route = useRoute();
const profileStore = useProfileStore();
const authStore = useAuthStore();

// ---- STATUS ---- //
const profileData = ref({
  userId: null,
  profile: {
    username: "",
    movies: {},
  },
});
const searchMovieInput = ref("");
const loading = ref(false);
const showDialog = ref(false);

// ---- COMPUTED ---- //
const isAdmin = computed(() => {
  if (profileData.value.userId === authStore.getUserId) {
    return true;
  } else {
    return false;
  }
});

// ---- FUNCTIONS ---- //
function toggleDialog() {
  showDialog.value = !showDialog.value;
  loading.value = false;
}

function searchMovie() {
  const encodedSearchString = encodeURIComponent(searchMovieInput.value);
  router.push({
    name: "addMovie",
    query: { search: encodedSearchString },
  });
}

function sortMovies(sortOrder = "asc") {
  let swapObj = {};
  const movies = profileData.value.profile.movies;
  for (const movie1 in movies) {
    for (const movie2 in movies) {
      if (movies[movie1].rate > movies[movie2].rate) {
        swapObj = movies[movie1];
        profileData.value.profile.movies[movie1] = movies[movie2];
        profileData.value.profile.movies[movie2] = swapObj;
      }
    }
  }
}

// ---- LIFECYCLE HOOKS ---- //
onMounted(async () => {
  const profile = await profileStore.getProfileByUsernam({
    username: route.params.username,
  });
  if (!profile) {
    router.push({ name: "notFound" });
  }
  profileData.value = { ...profile };
  sortMovies();
  console.log(profileData.value.profile.movies);
  for (const movie in profileData.value.profile.movies) {
    console.log(profileData.value.profile.movies);
  }
});
</script>

<style scoped>
header {
  text-align: center;
  margin: 6rem auto 2.5rem;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.actions .select-sort {
  background-color: #eaeaea;
  color: #252a34;
  border-radius: 5px;
  border: none;
  outline: none;

  letter-spacing: 1px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}
.actions .sort option {
  background-color: #eaeaea;
  color: #252a34;
}
.actions .sort option:checked {
  background-color: transparent;
}
.movies-list {
  text-align: center;
}
.addMovieDialog {
  text-align: center;
}
.addMovieDialog label {
  color: #252a34;
}
.addMovieDialog input {
  padding: 6px;
  font-size: 16px;
  border: 1px solid #474c56;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
  outline: none;
  color: #252a34;
}
.addMovieDialog input:focus {
  border-color: #252a34;
  box-shadow: 0 0 5px rgba(37, 42, 52, 0.5);
}
.searchMovieActions {
  margin: auto 1rem;
  width: 100%;
  display: flex;
  gap: 10px;
}
</style>
