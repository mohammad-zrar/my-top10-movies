import { defineStore } from "pinia";
import axios from "axios";

const useProfileStore = defineStore("use-profile", {
  actions: {
    async isUsernameUnique(payload) {
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}profiles/${payload.username}.json`
      );
      console.log(response.data);
    },
    async createProfile(payload) {
      const response = await axios.post(
        `${import.meta.env.VITE_REF_URL}profiles/${payload.username}.json?`,
        {
          userId: "nwOZBEoGyvPJ4DMmlnMdfWOJxPX2",
          movies: ["hhh", "fff", "ddd"],
        }
      );
      console.log(response);
    },
  },
});

export default useProfileStore;
