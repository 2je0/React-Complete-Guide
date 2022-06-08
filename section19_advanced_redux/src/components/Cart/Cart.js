import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const items = useSelector((state) => state.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {items.map((ele) => {
        const totalPrice = parseInt(ele.price) * parseInt(ele.amount);
        return (
          <ul>
            <CartItem
              item={{
                title: ele.title,
                quantity: ele.amount,
                total: totalPrice,
                price: ele.price,
              }}
            />
          </ul>
        );
      })}
      {/* <ul>
        <CartItem
          item={{
            title: items.title,
            quantity: 1,
            total: 12,
            price: 12,
          }}
        />
      </ul> */}
    </Card>
  );
};

export default Cart;
