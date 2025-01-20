export const calculateProgress = (currentQuestion, totalQuestions) => {
  return (currentQuestion / totalQuestions) * 100;
};

export const calculateScore = (correctAnswers, totalQuestions) => {
  return Math.round((correctAnswers / totalQuestions) * 100);
}; 

export const decodeString = (str) => {
  try {
    return decodeURIComponent(str)
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/%27/g, "'")
      .replace(/%3F/g, "?")
      .replace(/%3A/g, ":");
  } catch (error) {
    console.error('Error decoding string:', error);
    return str;
  }
}; 