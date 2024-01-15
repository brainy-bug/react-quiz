/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from "react";

const SECS_PER_QUESTION = 6;
const BASE_URL = "http://localhost:4000";

const initialState = {
  questions: [],
  totalPoints: 0,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  status: "loading", // "loading" | "error" | "success" | "finished" | "active"
};

const QuizContext = createContext();

const reducer = (state, action) => {
  const question = state.questions.at(state.index);
  switch (action.type) {
    case "quiz/loading":
      return { ...state, status: "loading" };
    case "quiz/success":
      return {
        ...state,
        status: "success",
        questions: action.payload,
      };
    case "quiz/error":
      return { ...state, status: "error" };
    case "quiz/start":
      return {
        ...state,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        status: "active",
      };
    case "quiz/answer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "quiz/next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "quiz/finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points < state.highscore ? state.highscore : state.points,
      };

    case "quiz/restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        status: "active",
      };

    case "timer/tick":
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

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = state.questions?.length;
  const totalPoints = state.questions?.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "quiz/loading" });
      try {
        const response = await fetch(`${BASE_URL}/questions`);
        const data = await response.json();
        dispatch({ type: "quiz/success", payload: data });
      } catch (error) {
        dispatch({ type: "quiz/error" });
      }
    };
    fetchData();
  }, []);

  const startTimer = () => dispatch({ type: "timer/tick" });

  const resetQuiz = () => dispatch({ type: "quiz/restart" });

  const endQuiz = () => dispatch({ type: "quiz/finish" });

  const handleNextQuiz = () => dispatch({ type: "quiz/next" });

  const handleAnswer = (index) =>
    dispatch({ type: "quiz/answer", payload: index });

  const startQuiz = () => dispatch({ type: "quiz/start" });

  return (
    <QuizContext.Provider
      value={{
        ...state,
        numOfQuestions,
        totalPoints,
        startTimer,
        resetQuiz,
        endQuiz,
        handleNextQuiz,
        handleAnswer,
        startQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export { QuizProvider, useQuiz };
