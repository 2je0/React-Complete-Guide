# Nextjs

- 내장 서버측 렌더링
- 파일 기반 라우팅
- fullstack app build

## 시작하기

`npx create-next-app`
`npm run dev` or `yarn dev`

## 중첩 라우팅

next js는 파일 기반 라우팅으로 pages 폴더 안에있는 파일 이름으로 라우팅 된다.  
그런데 중첩 라우팅, domain.com/news/something 을 만들려면 pages 안에 news `폴더`를 만들고  
news 페이지는 `index.js` 로 파일 이름변경, 이후 news 폴더 안에 something.js를 만들어야 한다.

## 동적 라우팅

news/n1 페이지와 news/n2 같이 details 안에 있는 내용만 달라지는 동적라우팅을 하고 싶다면  
news폴더 안에 [newsId] 라는 파일을 만들면된다. 리액트 라우팅에서 /:newsId 기능과 동일하다.

그리고 매개변수를 추출하고싶을 땐 다음과 같이 하면 된다.

```js
import { useRouter } from "next/router";
const router = useRouter();
const newId = router.query.newId;
```

## 페이지간 연결

<a> 태그를 통해서 각페이지로 연결하면 다시 html 파일을 불러오는 꼴이 된다.  
따라서 여태까지 작업한 state들을 다 잃을 수 있고 무엇보다 싱글페이지 앱이 아니게 된다.  
따라서 <Link> 태그를 이용해서 페이지간 연결을 해준다.
