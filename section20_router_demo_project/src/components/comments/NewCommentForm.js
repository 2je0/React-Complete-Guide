import { useEffect, useRef } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, error, status } = useHttp(addComment);
  const param = useParams();
  const { quoteId } = param;

  const submitFormHandler = (event) => {
    event.preventDefault();
    const comment = {
      quoteId,
      commentData: { text: commentTextRef.current.value },
    };
    sendRequest(comment);

    // optional: Could validate here

    // send comment to server
  };
  const { onClickAddComment } = props;
  useEffect(() => {
    if (status === "completed" && !error) {
      onClickAddComment();
    }
  }, [status, error, onClickAddComment]);

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
