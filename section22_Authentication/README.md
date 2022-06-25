![](images/2022-06-24-17-51-01.png)

## Authentication token

"인증 토큰"을 작업할 때, 이러한 토큰은 일반적으로 "JSON 웹 토큰" 형식(JWT)으로 생성됩니다.
"토큰"은 실제로 데이터를 문자열로 인코딩하는 알고리즘에 의해 구성된 긴 문자열입니다(프라이빗 키의 도움으로 서버에서만 알 수 있음).
https://jwt.io/

### firebase authentication

![](images/2022-06-24-17-46-53.png)

https://firebase.google.com/docs/reference/rest/auth

## 사용자 가입 추가하기

1. form submit handler를 만든다.
2. ref를 사용하여 정보를 가져온다.
3. login과 그렇지 않을때 로직을 분리한다.
4. web api key
   ![](images/2022-06-24-17-57-43.png)
5. fetch `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]`
6. POST 요청으로 보내준다.
7. 오류처리
8. onSubmit 연결하기

```js
const submitHandler = (event) => {
  event.preventDefault();
  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;

  if (isLogin) {
  } else {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCot7cJDNIrCAZqdWvp21o5UthZWsn6E4g",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }
};
```

![](images/2022-06-24-18-17-26.png)

## 사용자 피드백 표시

1. 오류 띄우기
2. ## loading 상태 표시

```js
then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      console.log(data);
    });
  } else {
    return res.json().then((data) => {
      let errorMessage = "Authentication failed";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      alert(errorMessage);
    });
  }
});
```

```js
{
  !isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>;
}
{
  isLoading && <p>Sending Request...</p>;
}
```

## 사용자 로그인 추가하기

1. sign up과 sign in 로직이 유사하므로 url 변수만 다르게 하여 중복 제거
2. 로그인이 성공했을 때를 다루기 위해 res.json()을 리턴해주고 다음 then 블록과 catch 블록을 만들어 그안에서 에러를 처리할 수 있도록 한다.
3. 인증토큰 살펴보기

```js
 if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCot7cJDNIrCAZqdWvp21o5UthZWsn6E4g";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCot7cJDNIrCAZqdWvp21o5UthZWsn6E4g";
    }
    fetch(url, {...})
```

```js
{
  //...
  then((res) => {
    setIsLoading(false);
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        let errorMessage = "Authentication failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      });
    }
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => alert(err.message));
}
```

![](images/2022-06-24-18-47-11.png)

## 컨텍스트로 인증 state 관리하기

1. store 폴더 만들기 - store 안에 auth-context.js 만들기
2. AuthContext 지정

```js
const AuthContext = react.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;
```

3. AuthProvider 지정

```js
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };
  const initialValue = {
    token: token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={initialValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
```

4. Provider 감싸기

```js
ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
```

5. Context 이용하기
   1. 로그인시 token 저장하기
      `const AuthCtx = useContext(AuthContext);`
      `AuthCtx.login(data.idToken);`
   2. ui 바꾸기
   ```js
   const MainNavigation = () => {
     const AuthCtx = useContext(AuthContext);
     const isLoggedIn = AuthCtx.isLoggedIn;
     return (
       <header className={classes.header}>
         <Link to='/'>
           <div className={classes.logo}>React Auth</div>
         </Link>
         <nav>
           <ul>
             {!isLoggedIn && (
               <li>
                 <Link to='/auth'>Login</Link>
               </li>
             )}
             {isLoggedIn && (
               <li>
                 <Link to='/profile'>Profile</Link>
               </li>
             )}
             {isLoggedIn && (
               <li>
                 <button>Logout</button>
               </li>
             )}
           </ul>
         </nav>
       </header>
     );
   };
   ```

## 보호된 리소스에 대한 요청에 토큰 사용하기(password 바꾸기)

![](images/2022-06-24-19-58-33.png)

```js
const AuthCtx = useContext(AuthContext);
const newPasswordInputRef = useRef();
const submitHandler = (event) => {
  event.preventDefault();
  const enteredNewPassword = newPasswordInputRef.current.value;

  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCot7cJDNIrCAZqdWvp21o5UthZWsn6E4g",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: AuthCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        let errorMsg = "Password change failed";
        return res.json().then((data) => {
          if (data && data.error && data.error.message) {
            errorMsg = data.error.message;
          }
          throw new Error(errorMsg);
        });
      }
    })
    .then((success) => console.log(success))
    .catch((err) => alert(err.message));
};
```

## 사용자 리디렉션 & 로그아웃

로그인 해주었을 때와 비밀번호를 바꿨을때 리디렉션 해줍니다.

```js
const history = useHistory();
history.replace("/");
```

로그아웃해주는것도 어렵지 않습니다. context에서 logout 함수만 호출해주면 token정보를 null로 바꾸어 로그아웃 됩니다.

```js
<button onClick={AuthCtx.logout}>Logout</button>
```

**_문제 : password 변경 페이지에서 로그아웃하면 그대로 password 변경 페이지에 머물러 있게 됨_**

## front-end 페이지 보호하기 (네비게이션 가드)

> 로그인 상태가 아닐 때 접근하면 안되는 페이지를 보호합니다.
> 인증상태에 따른 라우트 설정으로 해결

```js
function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {isLoggedIn && <UserProfile />}
          {!isLoggedIn && <Redirect to='/auth' />}
        </Route>
      </Switch>
    </Layout>
  );
}
```

**_문제점 : 새로고침 하면 로그인이 풀림_**

## 사용자 인증 state 유지하기

local storage 이용하기

```js
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  //...
};
```

## 자동으로 로그아웃되게 만들기

1. 토큰 유지 시간 + 현재 시간으로 토큰 만료시간을 계산해준다.

```js
.then((data) => {
        const expireTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        AuthCtx.login(data.idToken, expireTime);
        history.replace("/");
      })
```

2. 토큰 만료 시간을 login function에 전달해주고 남은 토큰 시간을 계산해주는 함수를 만든다.

```js
const calculateRemainingTime = (expireTime) => {
  const currentTime = new Date().getTime();
  const adjexpireTime = new Date(expireTime).getTime();
  return adjexpireTime - currentTime;
};
```

3. 남은 토큰 시간 이후 로그아웃 함수를 호출한다.

```js
const loginHandler = (token, expireTime) => {
  setToken(token);
  localStorage.setItem("token", token);
  const remainingTime = calculateRemainingTime(expireTime);

  setTimeout(logoutHandler, remainingTime);
};
```

## 자동으로 로그아웃 로컬스토리지 이용

1. 로그아웃을 한다면 setTimeout을 초기화 해준다. (단, logoutTimer가 null이 아닐 때)

```js
let logoutTimer;
const logoutHandler = () => {
  setToken(null);
  localStorage.removeItem("token");
  if (logoutTimer) clearTimeout(logoutTimer);
};

const loginHandler = (token, expireTime) => {
  setToken(token);
  localStorage.setItem("token", token);
  const remainingTime = calculateRemainingTime(expireTime);

  logoutTimer = setTimeout(logoutHandler, remainingTime);
};
```

2. 로그인 할 때, 토큰 만료시간을 local에 저장해주기

```js
const loginHandler = (token, expireTime) => {
  setToken(token);
  localStorage.setItem("token", token);
  localStorage.setItem("expireTime", expireTime);
  const remainingTime = calculateRemainingTime(expireTime);

  logoutTimer = setTimeout(logoutHandler, remainingTime);
};
```

3. 받은 토큰의 유효기간이 남아있다면 그 토큰을 가져오게 하는 함수 만들기
   이 함수는 토큰 만료 시간이 얼마남지 않았다면 null을 반환하여 새로운 토큰을 발급받도록 한다.
   그게 아니라면 남아있는 토큰을 이용하여 로그인 한다.

```js
const retrieveStoredToken = () => {
  const expireTime = localStorage.getItem("expireTime");
  const storedToken = localStorage.getItem("token");
  const remainingTime = calculateRemainingTime(expireTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};
```

4. initial 토큰을 위에 만든 함수에서 가지고 온다.

```js
export const AuthContextProvider = (props) => {
  const retrieveToken = retrieveStoredToken();
  let initalToken;
  if (retrieveToken) {
    initalToken = retrieveToken.token;
    console.log(retrieveToken.duration);
  }
  const [token, setToken] = useState(initalToken);
  const isLoggedIn = !!token;
  //...
};
```

5. 반환받은 duration을 이용해서 일정시간 이후에 로그아웃되도록 한다.
   주의할점은 logoutTimer를 logout할때 초기화 해주어야하므로 변수 지정을 해준다.

```js
useEffect(() => {
  if (retrieveToken) {
    logoutTimer = setTimeout(logoutHandler, retrieveToken.duration);
  }
}, [logoutHandler, retrieveToken]);
```

6. useEffect의 dependency를 logoutHandler로 가져갔으므로 useCallback으로 감싸준다.
   그리고 로그아웃시에 두 localstorage를 모두 지워준다.

```js
const logoutHandler = useCallback(() => {
  setToken(null);
  localStorage.removeItem("token");
  localStorage.removeItem("expireTime");
  if (logoutTimer) clearTimeout(logoutTimer);
}, []);
```
