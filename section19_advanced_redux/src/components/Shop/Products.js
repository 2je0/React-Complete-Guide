import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const items = useSelector((state) => state.menu);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {items.map((ele) => {
        return (
          <ul>
            <ProductItem
              title={ele.title}
              price={ele.price}
              description={ele.description}
            />
          </ul>
        );
      })}
    </section>
  );
};

export default Products;
