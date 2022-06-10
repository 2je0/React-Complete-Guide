import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import MainHeader from "./component/MainHeader";
import ProductDetail from "./Pages/ProductDetail";
import Products from "./Pages/Products";
import Welcome from "./Pages/Welcome";

function App() {
  return (
    <>
      <MainHeader />
      <main>
        <Route path='/' exact>
          <Redirect to='/welcome' />
        </Route>
        <Route path='/welcome'>
          <Welcome />
        </Route>
        <Route path='/products/:productID'>
          <ProductDetail />
        </Route>
        <Route path='/products' exact>
          <Products />
        </Route>
      </main>
    </>
  );
}

export default App;
