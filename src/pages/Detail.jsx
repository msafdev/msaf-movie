import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/Auth";

import { fetchCredit, fetchDetail } from "../utils/API";

const Detail = () => {
  const [detail, setDetail] = useState(null);
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const location = useLocation();

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const data = await fetchDetail(location.state.type, id);
      const credit = await fetchCredit(location.state.type, id);
      setDetail(data);
      setCredit(credit);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  console.log(credit);

  return (
    <div className="w-full h-full flex-1 flex flex-col">
      <div className="darkened-filter">
        <img
          src={`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`}
          className="w-full h-[300px] object-cover"
        />
      </div>
      {/* DETAIL */}
      <div className="flex flex-col -translate-y-[200px] gap-8">
        <div className="w-full md:px-[10%] flex flex-col items-center md:items-end md:flex-row gap-3 md:gap-4">
          <div className="w-full max-w-[300px] md:w-[300px] h-auto bg-gray-300">
            <img
              src={`https://image.tmdb.org/t/p/original${detail?.poster_path}`}
              className="w-full max-w-[300px] md:w-[300px] h-auto object-cover"
            />
          </div>
          <div className="flex-1 md:text-white flex flex-col gap-y-3 md:gap-y-4 justify-end w-full items-center">
            <div className="md:w-full h-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold md:w-[70%]">
                {detail?.name || detail?.original_title}
              </h1>
            </div>
            <div className="md:w-full h-fit md:h-[245px] text-[#010b13] md:text-base lg:text-lg text-justify">
              <div className="flex flex-col items-center md:items-start h-full">
                <div className="flex gap-2 my-2 justify-center md:justify-start">
                  {detail?.genres?.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-black text-white px-2 rounded-full text-sm py-1"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="text-xl flex flex-col w-[90%] max-w-[500px] mt-2 md:max-w-none">
                  <span className="font-medium mr-2 text-lg">Summary: </span>
                  <p className="md:line-clamp-5">{detail?.overview}</p>
                </div>
                <div className="text-base w-[90%] mt-4 lg:mt-auto">
                  <span className="font-medium mr-2 text-lg">
                    Release Date:{" "}
                  </span>
                  {formatDate(detail?.release_date) ||
                    formatDate(detail?.first_air_date)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CAST */}
        <div className="pt-4 px-[5%] md:px-[10%] w-full flex flex-col gap-y-3">
          <h1 className="text-2xl font-semibold">Casts</h1>
          <div className="relative grid grid-cols-3 lg:grid-cols-9 md:grid-cols-6 w-full gap-3">
            {credit?.cast?.slice(0, 9).map((cast, index) => (
              <div key={index} className="aspect-2/3">
                <img
                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                  className="w-auto h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
