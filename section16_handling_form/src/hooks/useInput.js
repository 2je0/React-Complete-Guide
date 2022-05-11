import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const hasError = validateValue(enteredValue);
  const valueIsInvalid = enteredValueTouched && hasError;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const InputBlurHandler = (e) => {
    setEnteredValueTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };
  return {
    value: enteredValue,
    enteredValueTouched,
    valueIsInvalid,
    hasError,
    valueChangeHandler,
    InputBlurHandler,
    reset,
  };
};
export default useInput;
