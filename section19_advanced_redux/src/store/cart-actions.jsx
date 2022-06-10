import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://meals-project-72c26-default-rtdb.firebaseio.com/cart.json"
    );
    if (!response.ok) {
      throw new Error("fetching failed");
    }
    const newCartItems = await response.json();
    try {
      dispatch(
        cartActions.replaceCart({
          items: newCartItems.items || [],
          totalQuantity: newCartItems.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};
export const sendCartData = (cart) => {
  const someFunction = async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "pending...",
        message: "sending request ...",
      })
    );

    const response = await fetch(
      "https://meals-project-72c26-default-rtdb.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );

    if (!response.ok) {
      throw new Error("something went wrong");
    }

    try {
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "sending request successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };

  return someFunction;
};
