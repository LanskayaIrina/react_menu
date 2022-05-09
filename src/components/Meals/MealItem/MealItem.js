import classes from './MealItem.module.css';
import {MealItemForm} from "./MealItemForm/MealItemForm";

export const MealItem = ({id, name, description, price}) => {
  const mealPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
      </div>
      <div className={classes.price}>{mealPrice}</div>
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  )
}
