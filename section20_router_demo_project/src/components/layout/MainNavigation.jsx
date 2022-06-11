import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  const history = useHistory();
  return (
    <header className={classes.header}>
      <div
        className={classes.logo}
        style={{ hover: "cursur" }}
        onClick={() => {
          history.push("/");
        }}
      >
        Great Quotes
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/quotes' activeClassName={classes.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to='new-quote' activeClassName={classes.active}>
              Add a Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
