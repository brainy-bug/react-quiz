/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Progress = ({ index, numOfQuestions, points, totalPoints, answer }) => {
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
