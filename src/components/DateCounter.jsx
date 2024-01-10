import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DEC":
      return { ...state, count: state.count - state.step };

    case "INC":
      return { ...state, count: state.count + state.step };

    case "SET_COUNT":
      return { ...state, count: parseInt(action.payload) };

    case "SET_STEP":
      return { ...state, step: parseInt(action.payload) };

    case "RESET":
      return initialState;

    default:
      throw new Error();
  }
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = () => dispatch({ type: "DEC" });

  const inc = () => dispatch({ type: "INC" });

  const defineCount = (e) =>
    dispatch({ type: "SET_COUNT", payload: e.target.value });

  const defineStep = (e) =>
    dispatch({ type: "SET_STEP", payload: e.target.value });

  const reset = () => dispatch({ type: "RESET" });

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
