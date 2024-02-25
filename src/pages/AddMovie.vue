<template>
  <div class="getBack">
    <base-button btnStyle="light" @click="getBack">
      <font-awesome-icon
        icon="fa-solid fa-left-long"
        class="backLogo"
        size="xl"
      />
      Get Back
    </base-button>
  </div>

  <div class="container">
    <h1>Search Result of "{{ movieName }}"</h1>
    <section class="resultSection">
      <h4 class="noResult">No Movie Found</h4>
      <div class="result-item">
        <div class="moviePoster"></div>
        <div class="movieInfo"></div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { defineProps, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import searchMovie from "../api/api.js";
import BaseButton from "../components/ui/BaseButton.vue";
import useAuthStore from "../store/AuthStore";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const movieName = computed(() => {
  return decodeURIComponent(route.query.search);
  r;
});

function getBack() {
  router.push({
    name: "userProfile",
    params: { username: authStore.getUsername },
  });
}
onMounted(() => {
  searchMovie(movieName.value);
});
</script>

<style scoped>
.backLogo {
  color: #252a34;
}
.getBack {
  display: flex;
  position: sticky;
  top: 1rem;
  left: 1rem;
}
.container {
  width: 100%;
  margin: 1rem auto;
  text-align: center;
}
.container h1 {
  margin-bottom: 3rem;
}
.noResult {
  color: #ff2e63;
}

@media only screen and (max-width: 768px) {
  .container h1 {
    font-size: 2rem;
  }
}
@media only screen and (max-width: 481px) {
  .container h1 {
    font-size: 1.25rem;
  }
}
</style>
