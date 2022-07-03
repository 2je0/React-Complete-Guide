import React from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
const index = (props) => {
  return (
    <MeetupDetails
      img={props.meetups.image}
      title={props.meetups.title}
      address={props.meetups.address}
      description={props.meetups.description}
    />
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://leejeyoung:mF3Xz3msybcvSO1n@cluster0.bt1mh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((ele) => {
      return { params: { meetupId: ele._id.toString() } };
    }),
  };
};

export const getStaticProps = async (context) => {
  //fetching data
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://leejeyoung:mF3Xz3msybcvSO1n@cluster0.bt1mh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetups: {
        id: meetupId,
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        discription: meetup.description,
      },
    },
  };
};
export default index;
