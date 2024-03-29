import { CartContext } from "../../../store/cart-context";
import { MealItemForm } from "./MealItemForm/MealItemForm";
import { useContext } from "react";
import classes from "./MealItem.module.css";

export const MealItem = ({ id, name, description, price, amount }) => {
  const cartCtx = useContext(CartContext);

  const mealPrice = `$${price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    cartCtx.addItem({ id, name, amount, price });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
      </div>
      <div className={classes.price}>{mealPrice}</div>
      <div>
        <MealItemForm
          id={id}
          amount={amount}
          onAddToCart={onAddToCartHandler}
        />
      </div>
    </li>
  );
};
