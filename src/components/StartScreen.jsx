/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const StartScreen = () => {
  const { numOfQuestions, startQuiz } = useQuiz();

  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={startQuiz}>
        Let&apos;s start
      </button>
    </div>
  );
};

export default StartScreen;
