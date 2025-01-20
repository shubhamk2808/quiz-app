import React from 'react';

const ScoreBar = ({ score, maxScore, totalQuestions }) => {
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  const maxScorePercentage = Math.round((maxScore / 100) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4">
      <div className="w-full max-w-[500px] mx-auto px-4">
        <div className="flex justify-between text-xs sm:text-sm mb-2">
          <span>Score: {scorePercentage}%</span>
          <span>Max Score: {maxScorePercentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="relative w-full h-full">
            {/* Max score line */}
            <div 
              className="absolute h-full w-px bg-red-500"
              style={{ left: `${maxScorePercentage}%` }}
            />
            {/* Score bar */}
            <div 
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBar; 