import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

// Components
import Recent from "../components/Recent/Recent";
import Series from "../components/Series/Series";
import Thumb from "../components/Thumbnail/Thumb";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="background-img w-full h-full flex-1 flex flex-col md:px-8 px-4">
      <div className="h-full w-full flex lg:flex-row flex-col flex-1 lg:gap-6 gap-4 md:pb-8 pb-4">
        <div className="flex flex-col lg:w-1/2 w-full gap-4">
          <div className="flex flex-col lg:h-full mt-auto h-fit justify-end">
            <h1 className="lg:text-6xl text-4xl pt-6 pb-0 lg:py-0 lg:text-right text-center">
              Discover the watch of your{" "}
              <span className="font-semibold">lifetime</span>
            </h1>
          </div>
          <Recent />
        </div>
        <div className="flex flex-col lg:w-1/2 w-full">
          {/* Featured */}
          <div className="flex flex-col flex-1 gap-4 lg:pt-4">
            <p className="flex items-center font-semibold h-[40px] w-full text-lg z-10 bg-gray-100 border-gray-200 border-2 rounded-full px-4 cursor-default">
              Recent
            </p>
            <Thumb />
            <Series />
          </div>
        </div>
      </div>
    </div>
  );
}
