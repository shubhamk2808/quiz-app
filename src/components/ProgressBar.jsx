import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200 fixed top-0 left-0">
      <div
        className="h-full bg-gray-600 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
