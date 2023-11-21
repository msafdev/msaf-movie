import { useState, useEffect } from "react";
import Card from "../components/Common/Card";
import Search from "../components/Navbar/Search";

export default function Series() {
  const [seriesData, setSeriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmdbToken = import.meta.env.VITE_APP_TMDB_TOKEN;

        const response = await fetch(
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=" +
            page +
            "&sort_by=popularity.desc",
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
        const trendingSeries = data.results;
        setSeriesData(trendingSeries.slice(0, 18));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <div className="px-4 md:px-8 my-4">
        <Search />
      </div>
      <div className="w-full h-full flex-1 flex flex-col md:px-8 px-4 pb-10">
        <h1 className="text-2xl font-semibold">All movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
          {loading ? (
            <>
              <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded-[32px]" />
              <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded-[32px]" />
              <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded-[32px]" />
              <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded-[32px]" />
              <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded-[32px]" />
              <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded-[32px]" />
            </>
          ) : (
            seriesData.map((series) => (
              <Card
                key={series.id}
                results={series}
                badge={false}
                sizingClass="w-full h-full aspect-[3/4] shadow-3xl"
              />
            ))
          )}
        </div>
        <div className="flex justify-end items-center w-full h-full gap-3">
          {page > 1 && (
            <button
              className="text-md font-semibold items-center bg-gray-200 px-4 py-3 rounded-full hover:shadow transition-all duration-300 ease-in-out"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Previous page
            </button>
          )}
          <button
            className="text-md font-semibold items-center bg-gray-200 px-4 py-3 rounded-full hover:shadow transition-all duration-300 ease-in-out"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next page
          </button>
        </div>
      </div>
    </>
  );
}
