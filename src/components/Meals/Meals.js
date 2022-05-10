import React from "react";
import { MealsSummary } from "./MealsSummary/MealsSummary";
import { AvailableMeals } from "./AvailableMeals/AvailableMeals";

export const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};
