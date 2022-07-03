import React from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";

const index = () => {
  return (
    <MeetupDetails
      img='https://www.akamai.com/site/im-demo/perceptual-standard.jpg'
      title='A second Meetup'
      address='seoul'
      description='new meet up'
    />
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
    ],
  };
};
export const getStaticProps = async (context) => {
  //fetching data
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetups: {
        id: meetupId,
        title: "A second Meetup",
        image: "https://www.akamai.com/site/im-demo/perceptual-standard.jpg",
        address: "seoul",
        discription: "new meet up",
      },
    },
  };
};
export default index;
