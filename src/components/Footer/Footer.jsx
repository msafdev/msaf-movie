// Icons
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandTwitter,
} from "react-icons/tb";

// Libraries
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  
  return (
    <div className="md:h-[30vh] h-full w-full flex flex-col lg:flex-row items-center justify-center bg-[#010b13] lg:mt-0 text-[#fdfeff] py-8 gap-4">
      <div className="w-full h-full flex flex-col items-center justify-center lg:gap-2">
        <div className="flex items-end">
          <code className="text-3xl md:text-5xl font-semibold">MSAF</code>
          <code className="text-2xl md:text-4xl text-gray-300">/dev</code>
        </div>
        <div className="flex gap-4 items-center">
          <TbBrandGithub className="w-6 h-6 cursor-pointer" />
          <TbBrandInstagram className="w-6 h-6 cursor-pointer" />
          <TbBrandTwitter className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-fit flex flex-col items-center justify-center">
        <code>Made with {"<3"} by Moon</code>
        <div className="flex items-center text-gray-300 w-fit gap-2 text-sm">
          <p>Powered by </p>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="TheMovieDatabase Icon"
            className="w-[28px]"
          />
        </div>
      </div>
    </div>
  );
}
