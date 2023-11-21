import { useEffect, useState } from "react";

export default function Badge({ type, genreID, size }) {
  const [genre, setGenre] = useState("");
  const [genreList, setGenreList] = useState([]);

  if (type) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const tmdbToken = import.meta.env.VITE_APP_TMDB_TOKEN;
  
          const response = await fetch(
            `https://api.themoviedb.org/3/genre/${type}/list?language=en-US`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${tmdbToken}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          const genreList = data.genres;
          const genreName = genreList.find((genres) => genres.id === genreID);
          setGenre(genreName.name);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, []);}

  if (genre === "Science Fiction") {
    setGenre("Sci-Fi");
  }

  const badgeStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "24px",
  };

  return (
    <div
      className={`backdrop-blur-sm px-2 py-1 text-gray-100 font-medium rounded-full cursor-default ${size}`}
      style={badgeStyle}
    >
      {genre}
    </div>
  );
}
