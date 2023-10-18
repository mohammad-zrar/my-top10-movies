<template>
  <h1>User Page</h1>
  <h2>Welcome {{ userName }}</h2>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userName = computed(() => {
      return route.params.username;
    });
    return { userName };
  },
};
</script>
