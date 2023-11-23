import React from "react";

const MediaOverview = ({ overview }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Overview</h3>
      <p className="text-gray-600">{overview}</p>
    </div>
  );
};

export default MediaOverview;
