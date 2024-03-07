import { defineStore } from "pinia";
import axios from "axios";
import useAuthStore from "./AuthStore";

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
    async getProfileByUserId(payload) {
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}/profiles.json`
      );
      const profiles = response.data;
      return profiles[payload.userId];
    },
    async getUsernameByUserId(payload) {
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}/profiles/${
          payload.userId
        }/profile/username.json`
      );
      return response.data;
    },
    async getProfileByUsernam(payload) {
      const response = await axios.get(
        `${import.meta.env.VITE_REF_URL}/profiles.json`
      );
      const profiles = await response.data;
      for (const userId in profiles) {
        if (profiles[userId].profile.username === payload.username) {
          return { userId: userId, ...profiles[userId] };
        }
      }
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
    async addMovie(payload) {
      const authStore = useAuthStore();

      const response = await axios.post(
        `${import.meta.env.VITE_REF_URL}profiles/${
          authStore.getUserId
        }/profile/movies.json?auth=${authStore.getToken}`,
        {
          ...payload,
        }
      );
      console.log(response);
    },
  },
});

export default useProfileStore;
