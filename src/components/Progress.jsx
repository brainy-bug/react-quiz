/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const Progress = () => {
  const { index, numOfQuestions, points, totalPoints, answer } = useQuiz();

  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={numOfQuestions} />
      <p>
        Question <strong>{index + 1}</strong>/{numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {totalPoints}
      </p>
    </header>
  );
};

export default Progress;
