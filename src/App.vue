<template>
  <TheNavbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import TheNavbar from "./components/TheNavbar.vue";
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
