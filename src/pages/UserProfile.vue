<template>
  <header>
    <h1 id="username">{{ profileData.profile.username }}</h1>
    <p>Welcome to my top 10 favorite movie pinner profile ❤</p>
  </header>
  <section class="movies-list">
    <flip-card
      title="The wolf of wall street"
      year="2017"
      overview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              gravida justo. Integer nec arcu ut ligula tristique lobortis eu id
              nisl. Quisque at velit non elit euismod vulputate. Fusce eu
              fringilla libero. Proin at mi sit amet urna ullamcorper suscipit
              ac eu dui. In hac habitasse platea dictumst. Nam bibendum purus
              nec tellus fringilla, vel efficitur nisi vulputate. Suspendisse in
              massa nec ex vulputate commodo. Vestibulum sagittis, nisl vitae
              bibendum congue, odio arcu vestibulum velit, sit amet tristique
              libero purus vel elit. Vestibulum consectetur turpis sit amet
              sapien consectetur, at lacinia justo hendrerit. Duis vel purus
              vitae tortor luctus bibendum."
      rating="8.4"
    ></flip-card>
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
  profile: {
    username: "",
  },
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
