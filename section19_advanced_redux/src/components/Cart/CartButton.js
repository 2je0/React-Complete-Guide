import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartbuttonHandler = () => {
    dispatch(cartActions.toggleHandler());
  };
  const items = useSelector((state) => state.items);
  let totalAmount = 0;
  for (const ele of items) {
    totalAmount = totalAmount + ele.amount;
  }
  return (
    <button className={classes.button} onClick={cartbuttonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default CartButton;
