import React from "react";

const DifficultyStars = ({ difficulty }) => {
  return (
    <div className="inline-flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < difficulty ? "text-black" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default DifficultyStars;
