<template>
  <TheNavbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import useAuthStore from "./store/AuthStore.js";
import TheNavbar from "./components/TheNavbar.vue";

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.tryLogin();
});
</script>

<style>
.container {
  margin: 5rem auto 2rem;
  width: 75%;
}
@media screen and (max-width: 481px) {
  .container {
    width: 90%;
  }
}
</style>
