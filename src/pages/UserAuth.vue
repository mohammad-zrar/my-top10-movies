<template>
  <div class="auth-section">
    <h2>Authentciation</h2>

    <form @submit.prevent="">
      <div v-if="formAction === 'Signup'" class="form-control">
        <label for="email">Email</label>
        <input type="email" />
      </div>
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" />
      </div>
      <div class="form-actions">
        <base-button btnStyle="blue">
          {{ formAction }}
        </base-button>
        <base-button btnStyle="flat" @click="changeAction">
          <span v-if="formAction === 'Signup'">Login</span>
          <span v-else>Signup</span> Instead</base-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "../components/ui/BaseButton.vue";
import { ref, computed } from "vue";
export default {
  components: {
    BaseButton,
  },
  setup() {
    const formAction = ref("Login");
    function changeAction() {
      if (formAction.value === "Login") {
        formAction.value = "Signup";
      } else {
        formAction.value = "Login";
      }
    }

    return { formAction, changeAction };
  },
};
</script>

<style scoped>
.auth-section {
  margin: 10rem auto;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  width: 55%;
  padding: 1.25rem;
}
h2 {
  margin-bottom: 0.75rem;
}
.form-control {
  display: grid;
  justify-content: center;
  margin: 1rem auto;
}
.form-actions {
  display: flex;
  gap: 1rem;
}
@media screen and (max-width: 768px) {
  .auth-section {
    width: 85%;
  }
}
</style>
