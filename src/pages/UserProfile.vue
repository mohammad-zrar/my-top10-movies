<template>
  <header>
    <h1 id="username">{{ profileData.profile.username }}</h1>
    <p>Welcome to my top 10 favorite movie pinner profile ❤</p>
  </header>
  <section class="movies-list">
    <flip-card></flip-card>
  </section>

  <pre>{{ profileData }}</pre>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useProfileStore from "../store/ProfileStore.js";
// Imported componented //
import FlipCard from "../components/FlipCard.vue";

// ------------------- //

const router = useRouter();
const route = useRoute();

const profileStore = useProfileStore();

const profileData = ref({
  userId: "",
  profile: { username: "" },
});

onMounted(async () => {
  const profile = await profileStore.getProfileByUsernam({
    username: route.params.username,
  });
  profileData.value = { ...profile };
});
</script>

<style scoped>
header {
  text-align: center;
  margin: 6rem auto 2.5rem;
}
.movies-list {
  text-align: center;
}
</style>
