import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAllAPI } from "../utils/API";

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllAPI(`/movie/${id}?language=en-US`);
        setMovieDetail(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie detail:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="movie-detail">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="movie-title">{movieDetail.title}</h1>
          <div className="movie-info">
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <p>
                <strong>Release Date:</strong> {movieDetail.release_date}
              </p>
              <p>
                <strong>Overview:</strong> {movieDetail.overview}
              </p>
              <p>
                <strong>Vote Average:</strong> {movieDetail.vote_average}
              </p>
              {/* Add more details as needed */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
