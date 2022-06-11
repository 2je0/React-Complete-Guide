import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
const DUMMY_QUOTES = [
  {
    id: "Q1",
    author: "LEE",
    text: "This is a test",
  },
  {
    id: "Q2",
    author: "JE",
    text: "Learning React is good",
  },
];
const Details = () => {
  const param = useParams();
  const quote = DUMMY_QUOTES.find((ele) => ele.id === param.quoteId);

  if (!quote) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Switch>
        <Route path='/quotes/:quoteId/comments'>
          <Comments />
        </Route>
      </Switch>
    </>
  );
};

export default Details;
