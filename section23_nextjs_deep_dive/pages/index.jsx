import MeetupList from "../components/meetups/MeetupList";
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

  return {
    props: {
      meetups: DUMMY_MEETUP,
    },
  };
};
export default HomePage;
