import React, { createContext, useContext, useState } from "react";
import { QUIZ_DATA } from "../constants/questions";
import { RESULT_MESSAGES } from "../constants/quiz";
import { decodeString } from "../utils/quizUtils";

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [quizState, setQuizState] = useState("start");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartQuiz = () => {
    setQuizState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setResult("");
    setShowNext(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answer) => {
    const isCorrect =
      answer === decodeString(QUIZ_DATA[currentQuestion].correct_answer);
    setSelectedAnswer(answer);

    if (isCorrect) {
      setScore(score + 1);
      setResult(RESULT_MESSAGES.CORRECT);
    } else {
      setResult(RESULT_MESSAGES.WRONG);
    }
    setShowNext(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < QUIZ_DATA.length) {
      setCurrentQuestion(currentQuestion + 1);
      setResult("");
      setShowNext(false);
      setSelectedAnswer(null);
    } else {
      setQuizState("completed");
    }
  };

  const value = {
    currentQuestion,
    score,
    result,
    showNext,
    quizState,
    selectedAnswer,
    totalQuestions: QUIZ_DATA.length,
    currentQuestionData: {
      question: decodeString(QUIZ_DATA[currentQuestion].question),
      category: decodeString(QUIZ_DATA[currentQuestion].category),
      difficulty: QUIZ_DATA[currentQuestion].difficulty,
      correct_answer: decodeString(QUIZ_DATA[currentQuestion].correct_answer),
      incorrect_answers: QUIZ_DATA[currentQuestion].incorrect_answers.map(
        (answer) => decodeString(answer)
      ),
    },
    handleStartQuiz,
    handleAnswerSelect,
    handleNextQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
