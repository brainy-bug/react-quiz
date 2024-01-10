/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const NextButton = ({ dispatch, index, numOfQuestions }) => {
  if (index === numOfQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "FINISH" })}
      >
        Finish
      </button>
    );
  }

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: "NEXT_QUESTION" })}
    >
      Next
    </button>
  );
};

export default NextButton;
