import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const togglee = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);
  const toggleCounterHandler = () => {
    // if (toggle) setToggle(false);
    // else setToggle(true);
    dispatch({ type: "togglecontrol" });
  };
  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };
  const increase5Handler = () => {
    dispatch({
      type: "increase",
      value: parseInt(numberInputRef.current.value),
    });
  };
  const numberInputRef = useRef();
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {togglee && <div className={classes.value}>{counter}</div>}
      <input type='number' ref={numberInputRef} />
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={incrementHandler}>increase</button>
        <button onClick={decrementHandler}>decrease</button>
        <button onClick={increase5Handler}>increase by n</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
