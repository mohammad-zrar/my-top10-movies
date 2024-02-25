import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your actual API key

const defaultHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`, // Replace with your actual access token
};

const searchMovie = async (query) => {
  try {
    const url = `${API_BASE_URL}`;
    const options = {
      method: "GET",
      headers: defaultHeaders,
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    };

    const response = await axios(url, options);

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default searchMovie;
