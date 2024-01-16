<template>
  <div v-if="classObjec.dropBack" class="backdrop" @click="toggle"></div>
  <nav :class="{ changeNavHieght: classObjec.changeNavHieght }">
    <div class="navbar">
      <div class="nav-brand">
        <h1>
          <router-link :to="{ name: 'home' }">My Top10 Movies</router-link>
        </h1>
      </div>

      <ul class="nav-menu" :class="{ collapsed: classObjec.collapsed }">
        <li class="nav-item">
          <router-link @click="toggle" :to="{ name: 'home' }"
            >My Profile</router-link
          >
        </li>
        <li class="nav-item">
          <router-link @click="toggle" :to="{ name: 'userAuth' }"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <a @click="logoutFunctions">Logout</a>
        </li>
      </ul>
    </div>
    <button @click="toggle" class="nav-toggler">
      <font-awesome-icon
        icon="fa-solid fa-bars"
        size="lg"
        style="color: #ffffff"
      />
    </button>
  </nav>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "../store/AuthStore.js";

const authStore = useAuthStore();
const router = useRouter();

const classObjec = reactive({
  collapsed: false,
  changeNavHieght: false,
  dropBack: false,
});
function toggle() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    classObjec.changeNavHieght = !classObjec.changeNavHieght;
    classObjec.dropBack = !classObjec.dropBack;
    classObjec.collapsed = !classObjec.collapsed;
  }
}
const dropShow = computed(() => classObjec.dropBack);

function logout() {
  authStore.logout();
}

function logoutFunctions() {
  logout();
  toggle();
  router.push({ name: "home" });
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9;
}
nav {
  background-color: #252a34;

  padding: 1rem 5rem;
  display: grid;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.75);
  height: 1.9rem;
  transition: height 0.25s ease;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 10;
}
.navbar {
  display: flex;

  justify-content: space-between;
  white-space: nowrap;
}

.nav-brand a {
  color: #ff2e63;
  text-decoration: none;
}

.nav-toggler {
  background-color: inherit;
  outline: none;
  border: none;
  border: 2px solid #eaeaea;
  padding: 0.25rem;
  border-radius: 3px;
  display: none;
  cursor: pointer;
}
.nav-toggler:hover,
.nav-toggler:active {
  transform: scale(1.05);
}
.nav-menu {
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
}
.nav-item {
  margin: 0 1.75rem;
  cursor: pointer;
}
.nav-item a {
  text-decoration: none;
  color: #ff2e63;
  transition: all 0.1s ease;
  padding: 0.15rem;
}
.nav-item a:hover {
  font-weight: bold;
}
.nav-item a:active,
.nav-item a.router-link-active {
  border-bottom: 2px solid #ff2e63;
  font-weight: bold;
}
@media screen and (max-width: 768px) {
  nav {
    padding: 1rem 2.5rem;
    display: flex;
    justify-content: space-between;
  }

  .nav-toggler {
    display: flex;
    height: 28px;
  }
  .nav-menu {
    display: none;
  }

  .navbar {
    display: grid;
  }
  .nav-item {
    margin: 0 0 0.2rem;
  }
  .changeNavHieght {
    height: 8rem;
    padding-bottom: 1rem;
  }
  .collapsed {
    display: grid;
  }
  .nav-item a:active,
  .nav-item a.router-link-active {
    border: none;
  }
}
@media screen and (max-width: 480px) {
  .nav-brand {
    display: none;
  }
}
</style>
