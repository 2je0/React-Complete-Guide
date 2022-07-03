## 페이지 구성 하기

![](images/2022-06-28-09-19-03.png)

## index 페이지 작성

```js
const DUMMY_MEETUP = [
  {
    id: "m1",
    title: "A second Meetup",
    image: "https://www.akamai.com/site/im-demo/perceptual-standard.jpg",
    address: "seoul",
    discription: "new meet up",
  },
];
const HomePage = () => {
  return <MeetupList meetups={DUMMY_MEETUP} />;
};
```

## new meetup page 만들기

```js
const NewMeetupPage = () => {
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};
```

## \_app.js 감싸기

> 레이아웃을 일일이 지정하지 않아도 된다.

```js
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## 프로그래밍 방식으로 탐색하기

```js
const router = useRouter();
const showDetailHandler = () => {
  router.push("/" + props.id);
};
<button onClick={showDetailHandler}>Show Details</button>;
```

## 사전 렌더링 작동방식 및 문제점

현재 Dummy Data를 사용하고 있다.

실제 백엔드에서 데이터를 가져오는 것처럼 데이터를 가지고 왔을 때 html 소스에는 meetu data가 빠져있다.  
useEffect 이전의 html을 사전렌더링한 것이다.

```js
const [allMeetups, setAllMeetups] = useState([]);
useEffect(() => {
  //fetching data
  setAllMeetups(DUMMY_MEETUP);
}, []);

return <MeetupList meetups={allMeetups} />;
```

![](images/2022-06-28-15-57-11.png)
따라서 이런 방식으로 접근하면 검색엔진은 백엔드 데이터를 잡을 수 없을 것이다.

## 정적 페이지 가져오기 getStaticProps

pages에 있는 파일만 가능, `getStaticProps` 정해진 이름으로 해야한다.
페이지에서 사전렌더링을 해야하는 정보들을 props로 넘겨줌

```js
const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export const getStaticProps = async () => {
  //fetching data
  return {
    props: {
      meetups: DUMMY_MEETUP,
    },
    revalidate: 3600,
  };
};
export default HomePage;
```

![](images/2022-06-28-16-22-56.png)

## SSG(static site generator)

revalidate를 추가하면 매번 빌드하고 배포하지 않아도 된다. (3600초마다 갱신됨)

```js
export const getStaticProps = async () => {
  //fetching data
  return {
    props: {
      meetups: DUMMY_MEETUP,
    },
    revalidate: 3600,
  };
};
```

## getServerSideProps

![](images/2022-07-01-20-48-01.png)

## getStaticProps

getStaticProps를 시용할 때 데이터를 fetch하려면 특정 url의 주소, 즉 id 값을 알아야한다.  
다음과 같이 context를 사용하면 id값을 추출할 수 있다.

```js
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
```

여기서 fallback이라는것을 설정해주지 않으면 페이지가 렌더링 되지 않는것을 볼 수 있다.

페이지가 빌드 프로세스 중에 프리 제너레이트 됐습니다라는 말은 -> 넥스트 js가 동적 페이지의 모든 버전의 프리제너레이트가 필요하다는 말이다. (지원되는 모든 id에서)동적이기 때문에 넥스트js는 어떤 id 밸류가 프리제너레이트 되는지 알아야 합니다. 만약 프리제너레이트 페이지가 아니라면 ..? 사용자가 url의 특정 밸류로 페이지에 방문했을 때 프리제너레이트 되는게 아님. 빌드프로세스때 되는 것. 따라서 모든 url에서 프리 제너레이트 해야함.

fall back을 false로 설정하면 path에게 모든 지원되는 미트업 id밸류를 포함하라고 하는 겁니다. 즉, 사용자가 지원되지 않는걸 입력하면, m3같은거요 404에러가 뜰겁니다
fallback을 true로 설정하면 next js기 페이지를 만들겁니다. 들어오는 요청에 관해서, 서버에서 미트업 id로 동적으로 만들겁니다.

요약하자면 paths 를 정의한다는 겁니다. 모든 페이지가 아니라요, 만약 페이지가 100개가 있는데 모든걸 프리 제너레이트 하고싶지 않고 안에있는 몇개만 하고싶을 수 있으니까요

#

## mongo db 연결하기

1. `npm install mongodb` 설치
2. `pages` 폴더 안에 `api` 폴더 생성 -> `new-meetup.js` 생성

```js
import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://leejeyoung:mF3Xz3msybcvSO1n@cluster0.bt1mh.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
```

## 데이터베이스에서 데이터 가져오기

모든 meetups를 표시하는 페이지에서 가져오기 입니다.  
주의 : id 필드가 객체로 되어있어서 바꿔주어야함

```js
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
```
