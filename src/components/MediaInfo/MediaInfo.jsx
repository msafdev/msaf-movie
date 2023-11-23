import React from "react";
import Badge from "../Common/Badge";
import Vote from "../Common/Vote";

export default function MediaInfo({ title, vote_average, genreID }) {
  return (
    <div className="relative bg-gray-900 bg-opacity-50 flex items-center justify-center px-10 py-12 text-white transition-opacity duration-200 ease-in-out">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="absolute top-5 right-5">
        <Vote vote={vote_average} />
      </div>
      <div className="absolute bottom-5 left-5">
        <Badge genreID={genreID} type={"movie"} size={"text-sm"} />
      </div>
    </div>
  );
}
