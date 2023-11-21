const API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const fetchAllAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results.slice(0, 18);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const searchMoviesAPI = async (searchQuery) => {
  try {
    const response = await fetch(`${API_BASE_URL}search/movie?searchQuery=${searchQuery}&include_adult=false&language=en-US&page=1`);
    const data = await response.json();

    if (response.ok) {
      return data.results;
    } else {
      throw new Error(data.status_message || "Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
