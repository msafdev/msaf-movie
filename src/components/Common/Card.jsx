import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import Badge from "./Badge";
import Vote from "./Vote";
import Detail from "../../pages/Detail"; // Import the Detail component

export default function Card({ results, sizingClass, badge }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${
      results.backdrop_path || results.poster_path
    })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  const overlayHoverStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  };

  return (
    <Link
      to={`/detail/${results.id}`}
      className={`${sizingClass} cursor-pointer z-20 rounded-[32px] flex flex-col justify-between p-6 lg:p-4 relative transition-all duration-500 ease-in-out`}
      style={cardStyle}
    >
      <div
        className="absolute inset-0 cursor-pointer rounded-[32px] z-10 transition-all duration-500 ease-in-out"
        style={isHovered ? overlayHoverStyle : overlayStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <Vote className="z-20" vote={results.vote_average} />
      <div className="flex flex-col z-20 relative">
        <div className="flex z-20 gap-2 flex-wrap py-2">
          {badge &&
            results.genre_ids?.map((genreId) => (
              <Badge
                key={genreId}
                genreID={genreId}
                type={"movie"}
                size={"text-xs"}
              />
            ))}
        </div>
        <h1 className="z-20 text-[#fdfeff] font-semibold text-md line-clamp-2">
          {results.title || results.name}
        </h1>
      </div>
    </Link>
  );
}
