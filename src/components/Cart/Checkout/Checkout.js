import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => !value.trim().length;
const isMoreFiveChars = (value) =>
  !value.trim().length || value.trim().length > 5;

export const Checkout = ({ onCancel, onSubmit }) => {
  const [formStateValidity, setFromStateValidity] = useState({
    name: true,
    street: true,
    house: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const houseInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredHouse = houseInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredHouseIsValid = !isMoreFiveChars(enteredHouse);

    setFromStateValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      house: enteredHouseIsValid,
    });

    const formIsValid =
      enteredNameIsValid && enteredStreetIsValid && enteredHouseIsValid;

    if (formIsValid) {
      onSubmit({
        name: enteredName,
        street: enteredStreet,
        house: enteredHouse,
      });
    }
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formStateValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={(e) => {
            e.target.value.length === 1 &&
              setFromStateValidity({ ...formStateValidity, name: true });
            e.target.value.length === 0 &&
              setFromStateValidity({ ...formStateValidity, name: false });
          }}
        />
        {!formStateValidity.name && <p>Please enter a valid name!</p>}
      </div>

      <div
        className={`${classes.control} ${
          !formStateValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Your street</label>
        <input
          ref={streetInputRef}
          type="text"
          id="street"
          onChange={(e) => {
            e.target.value.length === 1 &&
              setFromStateValidity({ ...formStateValidity, street: true });
            e.target.value.length === 0 &&
              setFromStateValidity({ ...formStateValidity, street: false });
          }}
        />
        {!formStateValidity.street && <p>Please enter a valid street!</p>}
      </div>

      <div
        className={`${classes.control} ${
          !formStateValidity.house && classes.invalid
        }`}
      >
        <label htmlFor="house">Your street</label>
        <input
          ref={houseInputRef}
          type="text"
          id="house"
          onChange={(e) => {
            e.target.value.length === 1 &&
              setFromStateValidity({ ...formStateValidity, house: true });
            e.target.value.length === 0 &&
              setFromStateValidity({ ...formStateValidity, house: false });
          }}
        />
        {!formStateValidity.house && <p>Please enter a valid house!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};
