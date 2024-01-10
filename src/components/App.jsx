/* eslint-disable no-unused-vars */

import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 6;

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  status: "loading", // "loading" | "error" | "success" | "finished" | "active"
};

const reducer = (state, action) => {
  const question = state.questions.at(state.index);

  switch (action.type) {
    case "FETCHING":
      return { ...state, status: "loading" };
    case "DATA_RECEIVED":
      return { ...state, status: "success", questions: action.payload };
    case "ERROR":
      return { ...state, status: "error" };
    case "START":
      return {
        ...state,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        status: "active",
      };
    case "ANSWER":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "FINISH":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points < state.highscore ? state.highscore : state.points,
      };

    case "RESET_QUIZ":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        status: "active",
      };

    case "TICK":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining === 0
            ? state.secondsRemaining
            : state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : "active",
      };

    default:
      return state;
  }
};

const App = () => {
  const [
    { questions, index, answer, points, highscore, secondsRemaining, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        dispatch({ type: "DATA_RECEIVED", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "success" && (
          <StartScreen numQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  numOfQuestions={numOfQuestions}
                  index={index}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            totalPoints={totalPoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
            secondsRemaining={secondsRemaining}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
