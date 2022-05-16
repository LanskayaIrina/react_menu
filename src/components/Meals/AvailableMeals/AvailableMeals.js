import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import { Card } from "../../UI/Card/Card";
import { MealItem } from "../MealItem/MealItem";
import { useHttp } from "../../../hooks/useHttp";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();

  const transformToArr = (obj) => {
    let arr = [];
    for (const key in obj) {
      //arr.push({ key, obj });
      arr = [...arr, { id: key, ...obj[key] }];
    }
    setMeals(arr);
  };
  useEffect(() => {
    sendRequest(
      {
        url: "https://flex-reality-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformToArr
    );
  }, []);

  let content;
  let mealList;

  if (isLoading) {
    content = <section className={classes.mealsLoading}>Loading...</section>;
  }

  if (error) {
    content = <section className={classes.mealsLoading}>{error}</section>;
  }

  if (!meals.length && !isLoading && !error) {
    content = (
      <section className={classes.mealsLoading}>No available meals</section>
    );
  }

  if (meals.length) {
    mealList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        amount={meal.amount}
      />
    ));
  }

  return (
    <section className={classes.meals}>
      {content}
      {!!meals.length && (
        <Card>
          <ul>{mealList}</ul>
        </Card>
      )}
    </section>
  );
};
