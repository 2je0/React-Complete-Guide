import { useRouter } from "next/router";
import React from "react";

const Course = () => {
  const router = useRouter();
  const details = router.query.details;
  const courseId = router.query.courseId;

  return (
    <h1>
      {details} 안에 있는 {courseId}
    </h1>
  );
};

export default Course;
