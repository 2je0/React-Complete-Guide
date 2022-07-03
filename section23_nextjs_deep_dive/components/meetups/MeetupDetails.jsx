import React from "react";
import classes from "./MeetupDetails.module.css";
const MeetupDetails = (props) => {
  return (
    <section className={classes.details}>
      <img src={props.img} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <address>{props.address}</address>
    </section>
  );
};

export default MeetupDetails;
