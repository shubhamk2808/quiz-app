import React from "react";
import DifficultyStars from "./DifficultyStars";
import { RESULT_MESSAGES } from "../constants/quiz";
import { useQuiz } from "../context/QuizContext";

const QuestionCard = () => {
  const {
    currentQuestion,
    totalQuestions,
    currentQuestionData,
    selectedAnswer,
    handleAnswerSelect,
    result,
    handleNextQuestion,
    showNext,
  } = useQuiz();

  const getDifficultyStars = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return 1;
      case "medium": return 2;
      case "hard": return 3;
      default: return 1;
    }
  };

  const allAnswers = React.useMemo(() => {
    const answers = [
      currentQuestionData.correct_answer,
      ...currentQuestionData.incorrect_answers,
    ];
    return answers;
  }, [currentQuestionData]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mt-4 w-full max-w-[500px]">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col items-start mb-2">
          <h2 className="text-base sm:text-lg font-bold">
            Question {currentQuestion + 1} of {totalQuestions}
          </h2>
          <span className="text-gray-600 text-xs sm:text-sm">{currentQuestionData.category}</span>
        </div>
        <div className="flex items-center">
          <DifficultyStars
            difficulty={getDifficultyStars(currentQuestionData.difficulty)}
          />
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg">{currentQuestionData.question}</p>

        <div className="space-y-2 sm:space-y-3">
          {allAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              disabled={showNext}
              className={`w-full p-3 sm:p-4 text-left border rounded-lg transition-colors text-sm sm:text-base
                ${!showNext && "hover:bg-gray-50 border-gray-200"}
                ${
                  showNext &&
                  answer === currentQuestionData.correct_answer &&
                  "bg-green-100 border-green-500"
                }
                ${
                  showNext &&
                  answer === selectedAnswer &&
                  answer !== currentQuestionData.correct_answer &&
                  "bg-red-100 border-red-500"
                }
                ${
                  showNext &&
                  answer !== selectedAnswer &&
                  answer !== currentQuestionData.correct_answer &&
                  "opacity-60 border-gray-200"
                }
              `}
            >
              {answer}
            </button>
          ))}
        </div>

        {result && (
          <div className="text-center mt-4">
            <p
              className={`text-lg font-semibold ${
                result === RESULT_MESSAGES.CORRECT
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {result}
            </p>
          </div>
        )}

        {showNext && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleNextQuestion}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg
                       hover:bg-gray-300 transition-colors font-medium"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
