<template>
  <base-button btnStyle="light" @click="getBack">
    <font-awesome-icon
      icon="fa-solid fa-left-long"
      class="backLogo"
      size="xl"
    />
    Get Back
  </base-button>

  <div class="container">
    <h1>Add Movie</h1>
    <h2>{{ movieName }}</h2>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
import { routerKey, useRoute, useRouter } from "vue-router";
import BaseButton from "../components/ui/BaseButton.vue";
import useAuthStore from "../store/AuthStore";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const movieName = computed(() => {
  return decodeURIComponent(route.query.search);
});

function getBack() {
  router.push({
    name: "userProfile",
    params: { username: authStore.getUsername },
  });
}
</script>

<style scoped>
.backLogo {
  color: #252a34;
}
/* .container {
} */
</style>
