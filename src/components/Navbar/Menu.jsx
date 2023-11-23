import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// CSS
import "./menu.css";

const API_BASE_URL = "https://api.themoviedb.org/3";

const fetchMoviesByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    // Function to handle scroll locking/unlocking
    const toggleScrollLock = () => {
      if (isOpen) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };

    toggleScrollLock();

    return () => {
      toggleScrollLock();
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={toggleDrawer}
        className="menu w-[50px] h-[50px] rounded-full px-3 py-2 flex flex-col justify-around items-center cursor-pointer lg:hidden"
      >
        <div className="line-1 w-1/2 h-[3px] bg-[#010b13] rounded-full self-end" />
        <div className="line-2 w-full h-[3px] bg-[#010b13] rounded-full" />
        <div className="line-3 w-1/2 h-[3px] bg-[#010b13] rounded-full self-end" />
      </div>
      <div
        className={`w-screen h-screen bg-[#010b13] flex flex-col absolute top-0 left-0 md:px-[8%] px-6 z-30 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <div className="flex flex-col w-full pt-6 items-start h-fit">
          <div
            onClick={toggleDrawer}
            className="ml-auto w-[50px] h-[50px] text-xl font-semibold rounded-full px-3 py-2 flex flex-col justify-around items-center cursor-pointer lg:hidden text-[#fdfeff]"
          >
            X
          </div>
          <p className="text-[#fdfeff] text-opacity-80 mt-4">
            Welcome to <span className="text-lg font-semibold">.Movie</span>
          </p>
          <div className="w-full h-[2px] border-b-[1px] border-b-gray-400 my-3" />
          <div className="mt-2">
            <p
              className="text-[#fdfeff] text-center my-2 hover:text-gray-300 transition-all duration-200 ease-in-out cursor-pointer"
              onClick={() => handleNavClick("/category/action")}
            >
              Action
            </p>
            <p
              className="text-[#fdfeff] text-center my-2 hover:text-gray-300 transition-all duration-200 ease-in-out cursor-pointer"
              onClick={() => handleNavClick("/category/comedy")}
            >
              Comedy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
