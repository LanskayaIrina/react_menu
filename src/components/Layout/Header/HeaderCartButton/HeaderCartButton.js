import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import { CartIcon } from "../../../Cart/CartIcon";
import { CartContext } from "../../../../store/cart-context";

export const HeaderCartButton = ({ onClick }) => {
  const cartContext = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (!cartContext.items.length) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Card</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
