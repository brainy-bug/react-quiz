/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

let emoji;

const FinishScreen = ({
  points,
  totalPoints,
  highscore,
  dispatch,
  secondsRemaining,
}) => {
  const percentage = Math.ceil((points / totalPoints) * 100);

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "😊";
  if (percentage >= 50 && percentage < 80) emoji = "😐";
  if (percentage < 50) emoji = "😒";
  if (percentage === 0) emoji = "🤦";

  return (
    <>
      {secondsRemaining === 0 && (
        <p className='highscore'>Your time&apos;s up</p>
      )}
      <p className='result'>
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of{" "}
        <strong>{totalPoints}</strong> ({percentage}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "RESET_QUIZ" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
