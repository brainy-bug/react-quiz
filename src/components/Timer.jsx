/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

const Timer = () => {
  const { secondsRemaining, startTimer } = useQuiz();

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      startTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [startTimer]);

  return (
    <div className='timer'>
      {mins < 10 && "0"}
      {mins}:{secs}
      {secs < 10 && "0"}
    </div>
  );
};

export default Timer;
