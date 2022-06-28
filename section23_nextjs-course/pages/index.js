import Link from "next/link";
import React, { Fragment } from "react";

const HomePage = () => {
  return (
    <Fragment>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link href='/lecture'>Lecture Page</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default HomePage;
