<template>
  <header>
    <h1 id="username">{{ profileData.profile.username }}</h1>
    <p>Welcome to my top 10 favorite movie pinner profile ❤</p>
  </header>
  <section class="actions">
    <base-button v-if="isAdmin" @click="toggleDialog"
      >Add movie to your list</base-button
    >
    <select class="sort" name="sort" id="sort">
      <option value="asc">Ascending Order</option>
      <option value="desc">Descending Order</option>
    </select>
  </section>
  <section class="movies-list">
    <!-- <flip-card
      title=""
      :year="2017"
      overview=""
      :rating="8.4"
    ></flip-card> -->
  </section>

  <pre>{{ profileData }}</pre>
  <base-dialog :backdrop="false" :show="showDialog" @close="toggleDialog">
    <template #header>
      <h2>Adding Movie...</h2>
    </template>
    <template #body>
      <p>Here the body of the dialog</p>
    </template>
    <template #actions>
      <base-button @click="toggleDialog">
        <span>Close</span>
      </base-button>
    </template>
  </base-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useProfileStore from "../store/ProfileStore.js";
import useAuthStore from "../store/AuthStore.js";
// Imported componented //
import FlipCard from "../components/FlipCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";

// ------------------- /

const router = useRouter();
const route = useRoute();

const profileStore = useProfileStore();
const authStore = useAuthStore();

const profileData = ref({
  userId: null,
  profile: {
    username: "",
  },
});

const isAdmin = computed(() => {
  if (profileData.value.userId === authStore.getUserId) {
    return true;
  } else {
    return false;
  }
});
const loading = ref(false);
const showDialog = ref(false);

function toggleDialog() {
  showDialog.value = !showDialog.value;
  loading.value = false;
}

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
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.actions .sort {
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
</style>
