import { useState, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameIsInvalid = enteredNameTouched && !nameIsValid;

  const keyStrokeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  useEffect(() => {
    if (nameIsValid) {
      console.log("name is valid");
    }
  }, [nameIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setNameIsValid(false);
      return;
    }
    setNameIsValid(true);
    console.log(enteredName);
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
          value={enteredName}
        />
      </div>
      {nameIsInvalid && <p style={{ color: "red" }}>name is unvalid.</p>}
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
