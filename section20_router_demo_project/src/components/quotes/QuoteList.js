import { Fragment } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SortingMethod = queryParams.get("sort") || "asc";
  const match = useRouteMatch();
  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending === "asc") {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };
  const sortedQuotesData = sortQuotes(props.quotes, SortingMethod);
  const sortingButtonHandler = () => {
    history.push({
      pathname: match.url,
      search: `?sort=${SortingMethod === "asc" ? "desc" : "asc"}`,
    });
    // history.push(
    //   `${location.pathname}?sort=${SortingMethod === "asc" ? "desc" : "asc"}`
    // );
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingButtonHandler}>
          Sorting {SortingMethod === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotesData.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
