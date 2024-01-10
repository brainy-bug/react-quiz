/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Options = ({ options, correctOption, dispatch, answer }) => {
  const hasAnswered = answer !== null;

  const getAnswerStatus = (index) => {
    if (index === answer) {
      if (index === correctOption) {
        return "answer correct";
      } else {
        return "answer wrong";
      }
    } else if (hasAnswered && index === correctOption) {
      return "correct";
    } else {
      return "";
    }
  };

  return (
    <div className='options'>
      {options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${getAnswerStatus(index)}`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "ANSWER", payload: index })}
        >
          {option}{" "}
          {index === answer ? (index === correctOption ? "✔" : "✖") : ""}
        </button>
      ))}
    </div>
  );
};

export default Options;
