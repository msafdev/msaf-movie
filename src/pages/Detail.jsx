import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchAllAPI } from "../utils/API";
import MediaInfo from "../components/MediaInfo/MediaInfo";
import MediaOverview from "../components/MediaInfo/MediaOverview";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const API_KEY = "0470cddcab19c9a9aae64557c6405662";
const API_BASE_URL = "https://api.themoviedb.org/3";

export default function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    }

    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="relative rounded-lg shadow-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ease-in-out"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
        <MediaInfo
          title={movie.title}
          vote_average={movie.vote_average}
          genreID={movie.genres?.[0].id}
        />
      </div>
      <MediaOverview overview={movie.overview} />
    </div>
  );
}
