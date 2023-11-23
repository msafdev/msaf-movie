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
    const response = await fetch(
      `${API_BASE_URL}/search/movie?searchQuery=${searchQuery}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      }
    );
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

export const fetchDetail = async (type, id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${type}/${id}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.status_message || "Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchCredit = async (type, id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      https: throw new Error(data.status_message || "Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
