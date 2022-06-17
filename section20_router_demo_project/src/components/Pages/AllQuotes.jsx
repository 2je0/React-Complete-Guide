import React, { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api";
import QuoteList from "../quotes/QuoteList";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";
// const DUMMY_QUOTES = [
//   {
//     id: "Q1",
//     author: "LEE",
//     text: "This is a test",
//   },
//   {
//     id: "Q2",
//     author: "JE",
//     text: "Learning React is good",
//   },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className='centered focused'>{error}</p>;
  }
  if (status === "completed" && loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <QuoteList quotes={loadedQuotes || []} />
    </div>
  );
};

export default AllQuotes;
