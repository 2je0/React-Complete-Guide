import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const param = useParams();
  const { quoteId } = param;
  const { sendRequest, status, data, error } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let allComments = <p>Comments...</p>;
  if (status === "pending") {
    allComments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && data) {
    allComments = <CommentsList comments={data}></CommentsList>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onClickAddComment={addCommentHandler} />
      )}
      {allComments}
    </section>
  );
};

export default Comments;
