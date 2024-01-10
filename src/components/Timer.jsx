/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

const Timer = ({ secondsRemaining, dispatch }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className='timer'>
      {mins < 10 && "0"}
      {mins}:{secs}
      {secs < 10 && "0"}
    </div>
  );
};

export default Timer;
