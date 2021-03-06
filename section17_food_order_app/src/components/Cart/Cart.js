import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderClicked, setOrderClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={() => {
            setOrderClicked(true);
          }}
        >
          Order
        </button>
      )}
    </div>
  );
  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://meals-project-72c26-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItem();
  };

  const cartModalItem = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderClicked ? (
        <Checkout onSubmit={submitHandler} onCancel={props.onClose} />
      ) : (
        modalAction
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data ...</p>;
  const didSubmitModalContent = <p>Successfully sent the order!</p>;
  return (
    <Modal onClose={props.onClose}>
      {didSubmit
        ? didSubmitModalContent
        : isSubmitting
        ? isSubmittingModalContent
        : cartModalItem}
    </Modal>
  );
};

export default Cart;
