import { defineStore } from "pinia";
import axios from "axios";
import useProfileStore from "./ProfileStore.js";
let timer;
const useAuthStore = defineStore("use-auth", {
  state: () => {
    return {
      userId: "",
      token: "",
      username: "",
      isUserAuthenticated: false,
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.isUserAuthenticated;
    },
    getUserId(state) {
      return state.userId;
    },
  },

  actions: {
    async register(payload) {
      return await this.auth({
        ...payload,
        mode: "register",
      });
    },

    async login(payload) {
      return await this.auth({
        ...payload,
        mode: "login",
      });
    },
    async auth(payload) {
      const profileStore = useProfileStore();
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
      if (payload.mode === "login") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
      } else {
        const isUnique = await profileStore.isUsernameAvailable({
          username: payload.username,
        });
        if (isUnique === false) {
          throw new Error("Username already exists, try another diffrent one.");
        }
      }
      const response = await axios
        .post(`${url}?key=${import.meta.env.VITE_API_KEY}`, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        })
        .then((response) => {
          this.username = payload.username;
          this.userId = response.data.localId;
          this.token = response.data.idToken;
          const expiresIn = response.data.expiresIn * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          if (payload.mode === "register") {
            profileStore.createProfile({
              username: this.username,
              userId: this.userId,
              token: this.token,
            });
          } else {
            localStorage.setItem("userId", response.data.localId);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            this.isUserAuthenticated = true;
            this.autoLogout({ expiresIn: expiresIn });
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
    tryLogin() {
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expirationDate");

      if (expirationDate && this.userId && this.token) {
        const currentDateTime = new Date().getTime();

        if (expirationDate > currentDateTime) {
          this.isUserAuthenticated = true;
        } else {
          this.logout();
        }
        const expiresIn = +expirationDate - currentDateTime;
        this.autoLogout({ expiresIn: expiresIn });
      }
    },
    autoLogout(payload) {
      timer = setTimeout(() => {
        this.logout();
      }, payload.expiresIn);
    },
    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      this.isUserAuthenticated = false;
      clearTimeout(timer);
      this.username = "";
      this.userId = "";
      this.token = "";
    },
  },
});

export default useAuthStore;
