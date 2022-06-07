# Redux

## State에 대한 관점

![](images/2022-06-07-22-39-48.png)

- local state
  - 한개의 component에 관여하는 state
  - toggle이나 input
- Cross-component
  - 여러개의 component에 관여하는 state
  - props chain , drilling 이용 -> React Context
  - modal 열때는 modal 바깥쪽의 state 이용하지만 닫을때는 modal component에서 control 해줌
- App-wide State
  - app 전반에 걸쳐 사용하는 state
  - props chain , drilling 이용 -> React Context
  - 로그인 인증

## React Context vs Redux

React Context가 있는데 Redux를 사용하는 두가지 이유

1. Complex Setup / Management
   - 중첩된 Provider를 사용해야함
     ![](images/2022-06-07-22-45-00.png)
   - 중첩 Provider를 사용하지 않으려면 하나의 Context 안에 여러 기능을 수행해야 함
     ![](images/2022-06-07-22-44-43.png)
2. Performance
   - 고빈도의 상태 업데이트를 Context에서 이용하면 성능이 저하될 수 있음
     ![](images/2022-06-07-22-45-14.png)

## Redux 작동방식

![](images/2022-06-07-23-33-59.png)

## Redux 설치하기

1. 비어있는 폴더를 준비한다.
2. redux-demo.js 파일을 만든다.
3. `npm init -y` 를 통해 `package.json`을 만든다.
4. `npm install redux`
5. `const redux = require('redux');`를 통해서 서드파티 라이브러리를 `import` 할 수 있다.

## Redux 개념 탐색

```javascript
const redux = require("redux");
//서드파티 라이브러리 불러오기

const counterReducer = (state = { counter: 0 }, action) => {
  return {
    counter: state.counter + 1,
    //일반적으로 객체를 반환
  };
};

const store = redux.createStore(counterReducer);
//저장소와 작업하는것은 reducer

console.log(store.getState());

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};
// 구독함수 -> reducer 트리거 될때마다 업데이트
// 항상 최신상태

//함수를 실행하라고 말해줘야함
store.subscribe(counterSubscriber);
//redux가 직접 실행
//남은건 액션, dispatch는 액션을 발송
store.dispatch({ type: "INCREMENT" });
```

터미널에서 `node 파일이름`으로 실행 할 수 있다.

## 더많은 개념

- reducer 함수 세분화

```javascript
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "INCREMENT") {
    return {
      counter: state.counter + 1,
      //일반적으로 객체를 반환
    };
  }
  if (action.type === "DECREMENT") {
    return {
      counter: state.counter - 1,
      //일반적으로 객체를 반환
    };
  }
  return state;
};
```
