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
      } else {
        const isUnique = await this.isUsernameUnique({
          username: payload.username,
        });
        if (isUnique === false) {
          throw new Error(
            "This username is already exists please try another different one."
          );
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
          // const expiresIn = 5000;
          const expirationDate = new Date().getTime() + expiresIn; // convert from seconds into miliseconds
          if (payload.mode === "signup") {
            this.createProfile({
              username: payload.username,
              userId: response.data.localId,
              token: response.data.idToken,
            });
          }
          console.log("here is from AuthStore.js line 61");
          console.log(response.data);
          localStorage.setItem("username", payload.username);
          localStorage.setItem("userId", response.data.localId);
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
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");

      clearTimeout(timer);
      this.username = "";
      this.userId = "";
      this.token = "";
    },
    async isUsernameUnique(payload) {
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}/profiles.json`
      );
      for (const un in response.data) {
        if (payload.username === un) {
          return false;
        }
      }
      return true;
    },
    async createProfile(payload) {
      const response = await axios.post(
        `${import.meta.env.VITE_REF_URL}/profiles/${payload.userId}.json?auth=${
          payload.token
        }`,
        {
          profile: {
            username: payload.username,
          },
        }
      );
    },
  },
});

export default useAuthStore;
