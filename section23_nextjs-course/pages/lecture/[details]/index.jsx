import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
const Details = () => {
  const router = useRouter();
  const details = router.query.details;
  const route = router.route;
  const path = router.asPath;
  console.log(route);
  console.log(path);
  return (
    <Fragment>
      <h1>{details} pages</h1>
      <ul>
        <li>
          <Link href={`${path}/react`}>React</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Details;
