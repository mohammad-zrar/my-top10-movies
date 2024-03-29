<template>
  <div class="auth-section">
    <h2>Authentciation</h2>

    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="mainForm.email.value"
          @keyup="checkEmail"
          placeholder="example@gmail.com"
          :class="{ invalid: !mainForm.email.valid }"
        />
        <span class="help">Enter a valid address</span>
      </div>
      <div v-if="formAction === 'Register'" class="form-control">
        <label for="username">Username</label>
        <input
          v-model="mainForm.username.value"
          @keyup="checkUsername"
          :class="{ invalid: !mainForm.username.valid }"
          type="text"
          placeholder="username"
        />
        <span class="help">Length>4, only letter or digit</span>
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input
          v-model="mainForm.password.value"
          @keyup="checkPassword"
          :class="{ invalid: !mainForm.password.valid }"
          type="password"
          placeholder="password"
        />
        <span class="help"> Enter a strong password </span>
      </div>

      <div class="form-actions">
        <base-button btnStyle="primery">
          {{ formAction }}
        </base-button>
        <base-button type="button" btnStyle="light" @click="changeAction">
          <span v-if="formAction === 'Register'">Login</span>
          <span v-else>Register</span> Instead</base-button
        >
      </div>
    </form>
  </div>

  <base-dialog :show="showDialog" @close="toggleDialog">
    <template #header>
      <h2>Authentication...</h2>
    </template>
    <template #body>
      <p>{{ dialogMessage }}</p>
    </template>
    <template #actions>
      <base-button @click="toggleDialog">
        <span>Close</span>
      </base-button>
    </template>
  </base-dialog>
  <base-spinner v-if="loading"></base-spinner>
</template>

<script setup>
import BaseButton from "../components/ui/BaseButton.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";
import { ref, computed, reactive, watch } from "vue";
import useAuthStore from "../store/AuthStore.js";
import useProfileStore from "../store/ProfileStore.js";
import BaseSpinner from "../components/ui/BaseSpinner.vue";
import { useRoute, useRouter } from "vue-router";

// use Router //
const router = useRouter();
const authStore = useAuthStore();

const dialogMessage = ref("");

const loading = ref(false);
const showDialog = ref(false);

function toggleDialog() {
  showDialog.value = !showDialog.value;
  loading.value = false;
}

// Actions Managment
const formAction = ref("Login");
function changeAction() {
  if (formAction.value === "Login") {
    formAction.value = "Register";
  } else {
    formAction.value = "Login";
  }
}

// Validate Form
const mainForm = reactive({
  email: {
    value: "",
    valid: true,
  },
  username: {
    value: "",
    valid: true,
  },
  password: {
    value: "",
    valid: true,
  },
});
const patterns = {
  username: /^[a-z\d]{5,12}$/i,
  password: /^[\d\w@#$%^&*()-_=+[\]{};:'",.<>/?!|\\`~]{8,20}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  //             yourname @ domain   .  com          ( .uk )
};
const checkEmail = computed(() => {
  if (patterns.email.test(mainForm.email.value)) {
    mainForm.email.valid = true;
  } else {
    mainForm.email.valid = false;
  }
});
const checkUsername = computed(() => {
  if (patterns.username.test(mainForm.username.value)) {
    mainForm.username.valid = true;
  } else {
    mainForm.username.valid = false;
  }
});
const checkPassword = computed(() => {
  if (patterns.password.test(mainForm.password.value)) {
    mainForm.password.valid = true;
  } else {
    mainForm.password.valid = false;
  }
});
// Submit Form

function submitForm() {
  if (formAction.value === "Login") {
    signin();
  } else {
    signup();
  }
}

async function signup() {
  loading.value = true;
  if (
    mainForm.email.valid &&
    mainForm.email.value !== "" &&
    mainForm.username.valid &&
    mainForm.username.value !== "" &&
    mainForm.password.valid &&
    mainForm.password.value !== ""
  ) {
    try {
      await authStore.register({
        email: mainForm.email.value,
        username: mainForm.username.value,
        password: mainForm.password.value,
      });
      dialogMessage.value =
        "Account registered successfully. You can now log in.";
      toggleDialog();
      changeAction();
      mainForm.email.value = "";
      mainForm.username.value = "";
      mainForm.password.value = "";
    } catch (err) {
      dialogMessage.value = err.message;
      toggleDialog();
    }
  }
  loading.value = false;
}
async function signin() {
  loading.value = true;
  if (
    mainForm.email.valid &&
    mainForm.email.value !== "" &&
    mainForm.password.valid &&
    mainForm.password.value !== ""
  ) {
    try {
      const response = await authStore.login({
        email: mainForm.email.value,
        password: mainForm.password.value,
      });
    } catch (err) {
      dialogMessage.value = err.message;
      toggleDialog();
    }
    const profileStore = useProfileStore();

    const username = await profileStore.getUsernameByUserId({
      userId: authStore.getUserId,
    });

    router.replace({ name: "userProfile", params: { username: username } });
  }
  loading.value = false;
}
</script>

<style scoped>
.auth-section {
  margin: 10rem auto;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  width: 300px;
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
.form-control input {
  padding: 0.32rem 0.25rem;
  border-radius: 4px;
  outline: none;
  border: 1px solid #252a34;
}
.form-control input:focus {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
}
.form-control label {
  color: #252a34;
  margin-bottom: 0.25rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.invalid {
  box-shadow: 0 0 6px rgba(237, 4, 4, 0.5) !important;
  border-color: red !important;
}
.help {
  font-size: 0.75rem;
  color: gray;
  margin-top: 1px;
}

@media screen and (max-width: 480px) {
  .auth-section {
    width: 85%;
  }
}
</style>
