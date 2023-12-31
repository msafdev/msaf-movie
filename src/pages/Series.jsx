import { useState, useEffect, useContext } from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";

import Card from "../components/Common/Card";
import Search from "../components/Navbar/Search";

import { fetchAllAPI, searchMoviesAPI } from "../utils/API";

export default function Series() {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const fetchData = async (searchQuery) => {
    try {
      let data;
      if (searchQuery) {
        data = await fetchAllAPI(
          "/search/tv?query=" +
            searchQuery +
            "&include_adult=false&language=en-US&page=1"
        );
      } else {
        data = await fetchAllAPI("/tv/popular?language=en-US&page=" + page);
      }

      setSeriesData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = (query) => {
    setPage(1);
    setLoading(true);
    fetchData(query);
  };

  return (
    <>
      <div className="px-4 md:px-8 my-4">
        <Search onSearch={handleSearch} />
      </div>
      <div className="w-full h-full flex-1 flex flex-col md:px-8 px-4 pb-10">
        <h1 className="text-2xl font-semibold">
          All series <RxDoubleArrowRight className="inline ml-3 w-6 h-6" />
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
          {seriesData.length === 0 || loading ? (
            <>
              {[...Array(18)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center w-full h-full aspect-[3/4] bg-gray-300 rounded-[32px]"
                />
              ))}
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
                  setLoading(true);
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
              setLoading(true);
            }}
          >
            Next page
          </button>
        </div>
      </div>
    </>
  );
}
