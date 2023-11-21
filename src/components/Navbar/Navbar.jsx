// Components
import Menu from "./Menu";
import Search from "./Search";

// Libraries
import { useState, useEffect, useRef } from "react";

// Links
import { navlinks } from "../../constant";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-between border-b-[1px] h-fit border-b-gray-300">
      <Link
        to="/"
        className="font-bold text-4xl lg:mr-[64px] pt-6 md:pb-6 pb-4 md:px-8 px-4 lg:border-r-[1px] border-r-gray-300"
      >
        <span className="leading-none text-4xl text-yellow-400">.</span>Movie
      </Link>
      <ul className="hidden lg:flex md:gap-10 gap-5 h-full items-center lg:mr-auto">
        {navlinks.map((link, index) =>
          Array.isArray(link.path) ? (
            <li
              key={index}
              onClick={() => setShow(!show)}
              className="flex items-center uppercase cursor-pointer text-gray-500 hover:text-[#010b13] gap-2 relative"
            >
              <p className="transition-all duration-200 ease-in-out font-medium">
                {link.name}
              </p>
              <MdKeyboardArrowDown
                className={`${
                  show ? "-rotate-180" : "rotate-0"
                } transition-all duration-200 ease-in-out`}
              />
              <div
                ref={dropdownRef}
                className={`absolute min-w-[200px] -translate-x-[30px] px-2 py-4 top-0 translate-y-10 bg-[#010b13] border-2 border-gray-200 ${
                  show ? "block" : "hidden"
                }`}
              >
                {link.path.map((sublink, index) => (
                  <p
                    key={index}
                    className="text-[#fdfeff] text-center my-2 hover:text-gray-300 transition-all duration-200 ease-in-out cursor-pointer"
                  >
                    {sublink.name}
                  </p>
                ))}
              </div>
            </li>
          ) : (
            <Link
              to={link.path}
              key={index}
              className="uppercase cursor-pointer font-medium text-gray-500 hover:text-[#010b13] transition-all duration-200 ease-in-out"
            >
              {link.name}
            </Link>
          )
        )}
      </ul>
      <div className="flex items-center gap-4 h-auto border-l-[1px] border-l-gray-300 pt-6 md:pb-6 pb-4 md:px-8 px-4">
        <Menu />
        <Link to="/login" className="hidden lg:block group">
          <button className="text-[#010b13] py-2 rounded-full font-semibold">
            Sign In
          </button>
          <div className="w-0 h-[2px] bg-[#010b13] group-hover:w-full transition-all duration-300 ease-in-out" />
        </Link>
      </div>
    </div>
  );
}
