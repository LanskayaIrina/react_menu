import React from "react";

import img from '../../../assets/meals.jpg';
import classes from './Header.module.css';
import {HeaderCartButton} from "./HeaderCartButton/HeaderCartButton";

export const Header = () => {
  return <>
    <header className={classes.header}>
      <h1>ReactMeals</h1>
      <HeaderCartButton onClick={() => {}} count={0}/>
    </header>
    <div className={classes['main-image']}>
      <img src={img} alt="a table full of food" />
    </div>

  </>
}
