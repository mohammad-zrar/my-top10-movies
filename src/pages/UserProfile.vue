<template>
  <h1>User Page</h1>
  <h2>Welcome {{ profileData.profile.username }}</h2>
  <p v-if="isLoading">Loading</p>
  <pre>{{ profileData }}</pre>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import useProfileStore from "../store/ProfileStore.js";

const router = useRouter();
const route = useRoute();

const ProfileStore = useProfileStore();

const profileData = ref({
  userId: "",
  profile: { username: "" },
});
const isLoading = ref(true);

onMounted(async () => {
  const profile = await ProfileStore.getProfileByUsernam({
    username: route.params.username,
  });
  profileData.value = { ...profile };
});
</script>
