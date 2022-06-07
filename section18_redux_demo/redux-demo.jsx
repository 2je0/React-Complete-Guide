const redux = require("redux");
//서드파티 라이브러리 불러오기

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
store.dispatch({ type: "DECREMENT" });
