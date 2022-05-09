import React from "react";

import classes from './HeaderCartButton.module.css';
import {CartIcon} from "../../../Cart/CartIcon";

export const HeaderCartButton = ({count, onClick}) => {
  return <button className={classes.button} onClick={onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Card</span>
    <span className={classes.badge}>{count}</span>
  </button>
}
