import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { counterAction } from "../store/counter-slice";
const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const toggle = useSelector((state) => state.counter.toggle);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(counterAction.toggleCounter());
  };
  const incrementHandler = () => {
    dispatch(counterAction.increment());
  };
  const decrementHandler = () => {
    dispatch(counterAction.decrement());
  };
  const increase5Handler = () => {
    dispatch(counterAction.increase(parseInt(numberInputRef.current.value)));
  };
  const numberInputRef = useRef();
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {toggle && <div className={classes.value}>{counter}</div>}
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
