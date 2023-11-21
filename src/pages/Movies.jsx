import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Common/Card";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "0470cddcab19c9a9aae64557c6405662";
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        movies.map((movie) => (
          <Card key={movie.id} results={movie} isLoading={isLoading} />
        ))
      )}
    </div>
  );
};

export default Movies;
