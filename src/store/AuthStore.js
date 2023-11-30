import { defineStore } from "pinia";
import axios from "axios";

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
      const response = await axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
            import.meta.env.VITE_API_KEY
          }`,
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          console.log("Here we go");
          console.log(response);
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
  },
});

export default useAuthStore;
