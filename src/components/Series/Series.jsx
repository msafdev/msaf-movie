import { useEffect, useState } from "react";

// Components
import Badge from "../Common/Badge";
import MoreButton from "../Common/MoreButton";
import Vote from "../Common/Vote";

// Icons
import { IoMdArrowDroprightCircle } from "react-icons/io";

// https://api.themoviedb.org/3/find/tt9362722?external_source=imdb_id SPIDERMANs

export default function Series() {
  const [movieData, setMovieData] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmdbToken = import.meta.env.VITE_APP_TMDB_TOKEN;

        const response = await fetch(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
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
        const trendingMovie = data.results;

        setMovieData(trendingMovie[count]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [count]);

  const thumbnailStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };

  const overlayHoverStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  return (
    <div
      style={thumbnailStyle}
      className="cursor-pointer thumb w-full h-full min-h-[300px] rounded-[32px] flex flex-col md:px-10 md:py-8 px-8 py-6 justify-between relative transition-all duration-500 ease-in-out"
    >
      <div
        className="absolute inset-0 rounded-[32px] z-10 transition-all duration-500 ease-in-out"
        style={isHovered ? overlayHoverStyle : overlayStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <div className="z-20 relative flex w-full items-center justify-between cursor-default">
        <div className="flex gap-2">
          <h1 className="text-gray-100 font-medium">Series</h1>
          <div>📺</div>
        </div>
        <div className="flex items-center gap-3">
          <IoMdArrowDroprightCircle
            onClick={() => {
              if (count > 0) {
                setCount(count - 1);
              } else if (count === 0) {
                setCount(19);
              }
            }}
            className="rotate-180 text-[#fdfeff] bg-transparent rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer w-7 h-7"
          />
          <IoMdArrowDroprightCircle
            onClick={() => {
              if (count < 19) {
                setCount(count + 1);
              } else if (count === 19) {
                setCount(0);
              }
            }}
            className="text-[#fdfeff] bg-transparent rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer w-7 h-7"
          />
        </div>
      </div>
      <div className="flex flex-col z-20 relative tex">
        <div className="flex gap-3 flex-wrap py-2">
          {movieData.genre_ids?.map((genreId) => (
            <Badge
              key={genreId}
              genreID={genreId}
              type={"tv"}
              size={"text-base"}
            />
          ))}
        </div>
        <h1 className="text-[#fdfeff] font-bold lg:text-3xl text-xl">
          {movieData.name}
        </h1>
        <div className="flex items-center md:justify-between mt-4 gap-6">
          <MoreButton />
          <Vote vote={movieData.vote_average} />
        </div>
      </div>
    </div>
  );
}
