import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
const Lecture = () => {
  const router = useRouter();
  const path = router.route;
  return (
    <Fragment>
      <h1>Lecture page</h1>
      <ul>
        <li>
          <Link href={`${path}/dashboard`}>Dashboard</Link>
        </li>
        <li>
          <Link href={`${path}/details`}>details</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Lecture;
