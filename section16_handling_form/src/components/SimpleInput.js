import { useState, useEffect } from "react";
import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    valueIsInvalid: nameIsInvalid,
    enteredValueTouched: enteredNameTouched,
    valueChangeHandler: keyStrokeHandler,
    InputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => {
    return value.trim() === "";
  });
  const [enteredEmail, setEnteredEmail] = useState("");

  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const nameIsValid = enteredName.trim() !== "";
  const emailIsValid = enteredEmail.trim() !== "";
  const emailIsInvalid = enteredEmailTouched && !emailIsValid;

  useEffect(() => {
    if (emailIsValid && nameIsValid) {
      setFormIsValid(true);
    }
  }, [emailIsValid, nameIsValid]);

  const emailkeyStrokeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredEmailTouched(true);
    if (!nameIsValid || !emailIsValid) {
      return;
    }
    resetName();
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };
  const nameClasses = nameIsInvalid ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={keyStrokeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        <label htmlFor='name'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={emailkeyStrokeHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      {nameIsInvalid && <p style={{ color: "red" }}>name is invalid.</p>}
      {emailIsInvalid && <p style={{ color: "red" }}>email is invalid.</p>}
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
