import { defineStore } from "pinia";
import axios from "axios";

const useProfileStore = defineStore("use-profile", {
  state: {},
  actions: {
    async createProfile(payload) {
      const response = await axios.put(
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
    async findUserByUserId(payload) {
      const response = await axios.get();
    },
  },
});

export default useProfileStore;
