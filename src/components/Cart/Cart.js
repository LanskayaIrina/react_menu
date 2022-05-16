import { useContext, useState } from "react";

import { Modal } from "../UI/Modal/Modal";
import { CartContext } from "../../store/cart-context";
import classes from "./Cart.module.css";
import { CartItem } from "./CartItem/CartItem";
import { Checkout } from "./Checkout/Checkout";

export const Cart = ({ onClose }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDidSubmit, setIsDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length;

  const cardItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: item.amount + 1 });
  };
  const cardItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const clearRartHandler = () => {
    cartCtx.clearCart();
  };

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://flex-reality-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, order: cartCtx.items }),
        headers: {
          ContentType: "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setIsDidSubmit(true);
    clearRartHandler();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cardItemAddHandler.bind(null, item)}
          onRemove={() => cardItemRemoveHandler(item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onClose}>
        Close
      </button>
      {!!hasItems && (
        <button
          className={classes.button}
          onClick={() => setIsCheckingOut(true)}
        >
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout
          onCancel={() => setIsCheckingOut(false)}
          onSubmit={orderSubmitHandler}
        />
      )}
      {!isCheckingOut && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <p>Order has sent successfully</p>;

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !isDidSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && isDidSubmit && didSubmitModalContent}
    </Modal>
  );
};
