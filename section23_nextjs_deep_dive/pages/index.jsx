import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
const DUMMY_MEETUP = [
  {
    id: "m1",
    title: "A second Meetup",
    image: "https://www.akamai.com/site/im-demo/perceptual-standard.jpg",
    address: "seoul",
    discription: "new meet up",
  },
];
const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export const getStaticProps = async () => {
  //fetching data
  const client = await MongoClient.connect(
    "mongodb+srv://leejeyoung:mF3Xz3msybcvSO1n@cluster0.bt1mh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  const adjMeetups = meetups.map((ele) => {
    return {
      title: ele.title,
      image: ele.image,
      address: ele.address,
      description: ele.description,
      id: ele._id.toString(),
    };
  });
  client.close();
  // console.log(adjMeetups);
  return {
    props: {
      meetups: adjMeetups,
    },
  };
};
export default HomePage;
