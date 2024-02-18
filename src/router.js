import { createRouter, createWebHistory } from "vue-router";
import UserAuth from "./pages/UserAuth.vue";
import UserProfile from "./pages/UserProfile.vue";
import NotFound from "./pages/NotFound.vue";
import useAuthStore from "./store/AuthStore.js";
import useProfileStore from "./store/ProfileStore.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "userAuth" },
    },
    {
      path: "/auth",
      name: "userAuth",
      component: UserAuth,
      beforeEnter: () => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated) {
          return false;
        }

        return true;
      },
    },
    {
      path: "/profile/:username",
      name: "userProfile",
      component: UserProfile,
    },
    { path: "/:pathMatch(.*)*", name: "notFound", component: NotFound },
  ],
});

export default router;
