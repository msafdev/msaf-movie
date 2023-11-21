import { useEffect, useState } from "react";

// Components
import Card from "../Common/Card";

// Icons
import { FiArrowRight } from "react-icons/fi";

export default function Recent() {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmdbToken = import.meta.env.VITE_APP_TMDB_TOKEN;

        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
        if (data) {
          setLoading(false);
        }
        const topRated = data.results.slice(0, 3);
        setMovieData(topRated);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center mb-4 relative gap-4">
        <p className="flex items-center font-semibold h-[40px] w-full text-lg z-10 bg-gray-100 border-gray-200 border-2 rounded-full px-4 cursor-default"><code>#</code>Recent</p>
        <div className="flex gap-0 z-10 h-[40px] items-center cursor-pointer hover:gap-2 transition-all duration-300 px-4 ease-in-out group bg-gray-100 border-gray-200 border-2 rounded-full">
          <p className="text-md font-semibold items-center">
            More
          </p>
          <FiArrowRight className="group-hover:w-[16px] w-0 text-lg transition-all duration-300 ease-in-out" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-[#fdfeff] text-2xl">Loading...</p>
          </div>
        ) : (
          movieData?.map((movie) => <Card key={movie.id} results={movie} />)
        )}
      </div>
    </div>
  );
}
