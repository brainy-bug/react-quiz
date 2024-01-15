/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

import { useQuiz } from "../contexts/QuizContext";

const NextButton = () => {
  const { index, numOfQuestions, endQuiz, handleNextQuiz } = useQuiz();

  if (index === numOfQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={endQuiz}>
        Finish
      </button>
    );
  }

  return (
    <button className='btn btn-ui' onClick={handleNextQuiz}>
      Next
    </button>
  );
};

export default NextButton;
