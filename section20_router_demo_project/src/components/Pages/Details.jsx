import React, { useEffect } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const Details = () => {
  const param = useParams();

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);
  const { quoteId } = param;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const match = useRouteMatch();

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (!quote) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />

      <Switch>
        <Route path={`${match.url}`} exact>
          <div className='centered'>
            <Link className='btn--flat' to={`${match.url}/comments`}>
              comments
            </Link>
          </div>
        </Route>
        <Route path={`${match.url}/comments`}>
          <Comments />
        </Route>
      </Switch>
    </>
  );
};

export default Details;
