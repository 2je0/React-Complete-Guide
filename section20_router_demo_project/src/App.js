import { Redirect, Route, Switch } from "react-router-dom";
import Details from "./components/Pages/Details";
import NewQuote from "./components/Pages/NewQuote";
import AllQuotes from "./components/Pages/AllQuotes";
import Layout from "./components/layout/Layout";
import NotFound from "./components/Pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='quotes' />
        </Route>
        <Route path='/quotes' exact>
          <AllQuotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <Details />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
