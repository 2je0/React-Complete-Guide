# 음식 주문 앱에 Http 및 양식 추가

## firebase로 데이터 이동

![](images/2022-06-05-15-38-02.png)

## http를 통해 meals 가져오기

```javascript
const [meals, setMeals] = useState([]);

useEffect(() => {
  const mealsFetchHandler = async () => {
    const response = await fetch(
      "https://react-http-8963a-default-rtdb.firebaseio.com/meals.json"
    );
    const responseData = await response.json();
    let loadedMeals = [];
    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      });
    }
    setMeals(loadedMeals);
  };
  mealsFetchHandler();
}, []);
```

헤맨것 : firebase로 이동  
`mealsFetchHandler`를 바깥에서 선언하면 무한루프 돔  
`.json()` 붙인것  
배열에 추가하는 방식 push  
`const key in responseData`  
`responseData[key].name` 의 방식으로 찾는 것

## 로딩 state 다루기

```javascript
const [isLoading, setIsLoading] = useState(false);
```

```javascript
setIsLoading(true);
    const mealsFetchHandler = async () => {...};
    setTimeout(() => {
        mealsFetchHandler();
        setIsLoading(false);
      },2000);
```

## error handle

```javascript
setIsLoading(true);
const mealsFetchHandler = async () => {
  const response = await fetch(
    "https://react-http-8963a-default-rtdb.firebaseio.com/meals.json"
  );
  if (!response.ok) {
    throw new Error("something went wrong!");
  }
  const responseData = await response.json();
  let loadedMeals = [];

  for (const key in responseData) {
    loadedMeals.push({
      id: key,
      name: responseData[key].name,
      description: responseData[key].description,
      price: responseData[key].price,
    });
  }
  setMeals(loadedMeals);
  // try {
  //   setMeals(loadedMeals);
  // } catch (error) {
  //   console.log("error catch");
  //   setError(error.message);
  // }
};
setTimeout(() => {
  mealsFetchHandler().catch((error) => {
    setIsLoading(false);
  });
  setError(error.message);
}, 2000);
```

주석으로 처리한 대로 try/catch 블록을 사용하면 오류가 반영이 되지 않는다.
왜냐하면 `mealsFetchHandler` 함수는 비동기로 실행이 되기 때문이다.
따라서 `mealsFetchHandler.catch`블록으로 비동기 실행을 시켜주어야 한다.

## 양식 넣기

![](images/2022-06-05-16-23-15.png)
Order 버튼을 눌렀을 때 사용자 양식을 입력하는 창이 나오게 하는것이 목적.
confirm 버튼과 cancel 버튼을 클릭할 수 있게 만들고 두 버튼은 안나오게 만든다.
Checkout.jsx 만들기 (form)

```javascript
<form>
  <div className={classes.control}>
    <label htmlFor='name'>Your name</label>
    <input type='text' id='name' />
  </div>
  ...
  <button type='button' onClick={props.onCancel}>
    Cancel
  </button>
  <button>Confirm</button>
</form>
```

button은 부모 component의 onClose 함수를 실행시키도록 했다.
Cart.js에서

```javascript
{
  orderClicked ? <Checkout onCancel={props.onClose} /> : modalAction;
}
```

두버튼을 나오지 않게, Checkout이 나오게 만들었다 .

form을 제출하면 처리할 함수도 만들어 준다.

```javascript
const CheckoutHandler = (event) =>{
        event.preventDefault();
    }
  return (
    <form onSubmit={CheckoutHandler}>
```
