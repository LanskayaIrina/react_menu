import { useContext, useRef, useState } from "react";

import { Input } from "../../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

export const MealItemForm = ({ id, amount, onAddToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      !enteredAmount.trim().length ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: id,
          type: "number",
          min: amount ? amount : 1,
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Enter a valid amount (1 - 5)</p>}
    </form>
  );
};
