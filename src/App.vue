<template>
  <TheNavbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
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
