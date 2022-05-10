import { useContext } from "react";

import { Modal } from "../UI/Modal/Modal";
import { CartContext } from "../../store/cart-context";
import classes from "./Cart.module.css";
import { CartItem } from "./CartItem/CartItem";

export const Cart = ({ onClose }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length;

  const cardItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: item.amount + 1 });
  };
  const cardItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
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

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
        {!!hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
