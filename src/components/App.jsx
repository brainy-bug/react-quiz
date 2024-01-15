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
import { useQuiz } from "../contexts/QuizContext";

const App = () => {
  const { status, questions, answer } = useQuiz();

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "success" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress
            // index={index}
            // numOfQuestions={numOfQuestions}
            // points={points}
            // totalPoints={totalPoints}
            // answer={answer}
            />
            <Question
            // question={questions[index]}
            // dispatch={dispatch}
            // answer={answer}
            />

            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;
