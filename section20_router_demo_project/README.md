## Layout

```javascript
import React from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
```

```javascript
function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='quotes' />
        </Route>
        <Route path='/quotes' exact>
          <AllQuotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <Details />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
      </Switch>
    </Layout>
  );
}
```

#

## 동적 라우팅으로 링크를 찾지 못한 경우

```javascript
<Route path='*'>
  <NotFound />
</Route>
```

## 프로그래밍 방식(필수) 탐색 구현하기

폼을 제출하고 다른 페이지로 이동시킬 수 있는 훅
push : 이동후 back 버튼을 클릭하면 이전으로 돌아감  
replace : 돌아가지 못함

```javascript
const NewQuote = () => {
  const history = useHistory();
  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    history.replace("/quotes");
  };
  return (
    <div>
      <QuoteForm onAddQuote={addQuoteHandler} />
    </div>
  );
};
```

## 페이지 이탈 막기( Form )

1.  `const [isEntering, setIsEntering] = useState(false);`
    입력이 진행중이었는지 판단
2.  ```javascript
    <form
      onFocus={() => {
        setIsEntering(true);
      }}
      className={classes.form}
      onSubmit={submitFormHandler}
    ></form>
    ```
3.  `<Prompt when={isEntering} message='finish?' />` 넣어줌
4.  제출 버튼 누를 때
    ```javascript
    <button
      className='btn'
      onClick={() => {
        setIsEntering(false);
      }}
    >
      Add Quote
    </button>
    ```

#

## 쿼리 매개변수 작업하기

- location을 이용하면 쿼리를 볼 수 있다.

  ```javascript
  const location = useLocation();
  console.log(location);
  ```

  ![](images/2022-06-12-04-43-28.png)

- URLSearchParams을 이용하면 매개변수를 추출할 수 있다.

  ```javascript
  const queryParams = new URLSearchParams(location.search);
  const SortingMethod = queryParams.get("sort");
  ```

- 매개변수를 받아서 정렬해준다.

  ```javascript
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SortingMethod = queryParams.get("sort") || "asc";

  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending === "asc") {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };
  const sortedQuotesData = sortQuotes(props.quotes, SortingMethod);
  const sortingButtonHandler = () => {
    history.push("/quotes?sort=" + (SortingMethod === "asc" ? "desc" : "asc"));
  };
  ```

v5 v6 다른점
https://kyung-a.tistory.com/36
