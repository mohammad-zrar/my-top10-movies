import { defineStore } from "pinia";
import axios from "axios";
let timer;
const useAuthStore = defineStore("use-auth", {
  state: () => {
    return {
      username: "",
      userId: "",
      token: "",
    };
  },
  actions: {
    async signup(payload) {
      this.auth({
        ...payload,
        mode: "signup",
      });
    },

    async login(payload) {
      this.auth({
        ...payload,
        mode: "login",
      });
    },
    async auth(payload) {
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
      if (payload.mode === "login") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
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
          // const expiresIn = response.data.expiresIn * 1000;
          const expiresIn = 5000;
          const expirationDate = new Date().getTime() + expiresIn; // convert from seconds into miliseconds

          localStorage.setItem("username", payload.username);
          localStorage.setItem("userId", response.data.idToken);
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);

          timer = setTimeout(() => {
            this.logout();
          }, expiresIn);
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");

      clearTimeout(timer);
      this.username = "";
      this.userId = "";
      this.token = "";
    },
  },
});

export default useAuthStore;
