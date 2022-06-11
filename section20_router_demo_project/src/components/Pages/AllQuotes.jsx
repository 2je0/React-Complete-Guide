import React from "react";
import QuoteList from "../quotes/QuoteList";
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
const AllQuotes = () => {
  return (
    <div>
      <QuoteList quotes={DUMMY_QUOTES} />
    </div>
  );
};

export default AllQuotes;
