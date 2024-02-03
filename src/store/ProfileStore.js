import { defineStore } from "pinia";
import axios from "axios";

const useProfileStore = defineStore("use-profile", {
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
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}/profiles.json`
      );
      const profiles = response.data;
      return profiles[payload.userId];
    },
    async isUsernameAvailable(payload) {
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}/profiles.json`
      );
      // check username availability, return false if the username is already exists
      const profiles = response.data;
      for (const userId in profiles) {
        if (profiles[userId].profile.username === payload.username) {
          return false;
        }
      }
      return true;
    },
  },
});

export default useProfileStore;
