import { useState, useEffect } from "react";

// CSS
import "./menu.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
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
        className={`w-screen h-screen absolute top-0 left-0 md:px-[8%] px-6 z-30 transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-x-0 bg-[#010b13] flex flex-col"
            : "translate-x-[100vw]"
        }`}
      >
        <div className="flex justify-between w-full pt-6 items-center h-fit">
          <h1 className="font-bold text-4xl lg:mr-[64px] text-[#fdfeff]">
            {/* Add your drawer content here */}
            .Movie
          </h1>
          <div
            onClick={toggleDrawer}
            className="w-[50px] h-[50px] text-xl font-semibold rounded-full px-3 py-2 flex flex-col justify-around items-center cursor-pointer lg:hidden text-[#fdfeff]"
          >
            X
          </div>
        </div>
      </div>
    </>
  );
}
