import { createRouter, createWebHistory } from "vue-router";
import UserAuth from "./pages/UserAuth.vue";
import UserProfile from "./pages/UserProfile.vue";
import NotFound from "./pages/NotFound.vue";

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
    },
    {
      path: "/profile/:username",
      name: "userProfile",
      component: UserProfile,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
