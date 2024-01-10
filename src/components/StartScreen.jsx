/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";

const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "START" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
};

export default StartScreen;
