import React from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ScoreBar from "./ScoreBar";
import { calculateProgress } from "../utils/quizUtils";
import { useQuiz } from "../context/QuizContext";

const MAX_SCORE_PERCENTAGE = 70; // Pass mark is 70%

const Quiz = () => {
  const {
    quizState,
    score,
    totalQuestions,
    currentQuestion,
    handleStartQuiz,
  } = useQuiz();

  const renderStartPage = () => (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-[500px] mx-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
      <p className="mb-6 text-gray-600 text-sm sm:text-base">
        Test your knowledge with {totalQuestions} questions from various categories.
      </p>
      <button
        onClick={handleStartQuiz}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
      >
        Start Quiz
      </button>
    </div>
  );

  const renderCompletionPage = () => {
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    const passed = scorePercentage >= MAX_SCORE_PERCENTAGE;

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-[500px] mx-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Quiz Completed! 🎉</h1>
        <p className="text-xl mb-4">
          Your Score: {score} out of {totalQuestions} ({scorePercentage}%)
        </p>
        <p
          className={`text-lg mb-6 ${
            passed ? "text-green-600" : "text-red-600"
          }`}
        >
          {passed ? (
            <span>Congratulations! You passed!</span>
          ) : (
            <span>You need {MAX_SCORE_PERCENTAGE}% to pass. Try again!</span>
          )}
        </p>
        <p className="text-lg mb-6 text-gray-600">
          {scorePercentage === 100
            ? "Perfect score! You're amazing!"
            : scorePercentage >= 80
            ? "Great job! Well done!"
            : scorePercentage >= 60
            ? "Good effort! Keep practicing!"
            : "Keep learning and try again!"}
        </p>
        <button
          onClick={handleStartQuiz}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Try Again
        </button>
      </div>
    );
  };

  const renderQuiz = () => (
    <div>
      <ProgressBar
        progress={calculateProgress(currentQuestion + 1, totalQuestions)}
      />
      <QuestionCard />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 pb-20">
        <div className="w-full max-w-[500px] mx-auto">
          {quizState === "start" && renderStartPage()}
          {quizState === "playing" && renderQuiz()}
          {quizState === "completed" && renderCompletionPage()}
        </div>
      </div>
      {quizState !== "start" && (
        <ScoreBar
          score={score}
          maxScore={MAX_SCORE_PERCENTAGE}
          totalQuestions={totalQuestions}
        />
      )}
    </div>
  );
};

export default Quiz;
