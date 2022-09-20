# 굉장히 어려움 ⁉

# 커스텀 훅 재사용

hooks 폴더 안에 `use`로 시작하는 컴포넌트를 만들자
주의> 반드시 `use`로 시작해야함
ForwardCounter 컴포넌트와 BackwardCounter 컴포넌트는 매우 닮아있다.
재사용하기 위해 커스텀 훅을 사용한다.

```js
const ForwardCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Card>{counter}</Card>;
};
```

```js
const BackwardCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Card>{counter}</Card>;
};
```

공통된 부분을 함수로 정의 해주고 bool 변수를 이용하여 forward 인지 backward 인지 판단해준다.

`const useCounter = (forward = true) => {}`

default value 설정해주기

```js
    useEffect(() => {
        const interval = setInterval(() => {
            if (forward)
                setCounter((prevCounter) => prevCounter + 1);
            else {
                setCounter((prevCounter) => prevCounter - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [forward]);
```

useEffect 내부를 위와 같이 수정해준후, forward를 dependency로 추가한다.

그리고 원래 컴포넌트에서는 counter 변수를 이용하므로 counter를 반환해주도록 한다.
다음과 같이 컴포넌트를 간략하게 만들 수 있다.

```js
const ForwardCounter = () => {
  const counter = useCounter(true);
  return <Card>{counter}</Card>;
};
```

```js
const BackwardCounter = () => {
  const counter = useCounter(false);
  return <Card>{counter}</Card>;
};
```

---

# 현실적인 예제

## useHttp 만들기

```javascript
const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};
```

```javascript
function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({
        id: taskKey,
        text: tasksObj[taskKey].text,
      });
    }
    console.log(loadedTasks);

    setTasks(loadedTasks);
  };

  const httpData = useHttp(
    {
      url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTasks
  );

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prev) => prev.concat(task));
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}
```

이 부분에서

```javascript
useEffect(() => {
  fetchTasks();
}, []);
```

dependency에 fetchTask를 넣어버리면 무한루프가 발생. 따라서 SendRequest 함수를 Callback으로 만들어주어야 함.  
이때 dependency 는 `[requestConfig, applyData]` 이다.  
하지만

```javascript
const httpData = useHttp(
  {
    url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",
  },
  transformTasks
);
```

에서 볼 수 있듯이 `[requestConfig, applyData]` 둘다 객체 이기 때문에 `transformTasks`를 useCallback으로 감싸주어야 하고 `url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",` 부분은 useMemo를 이용해야 한다.

번거로움을 줄이기 위해서 sendRequest에서 바로 인자를 받아온다.

```javascript
const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [applyData]
  );
```

App.js 안에서

```javascript
(...)
const httpData = useHttp(transformTasks);

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    fetchTasks({
      url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",
    });
  }, [fetchTasks]);
(...)
```

useCallback을 `transformTasks`에서 사용하는 것도 귀찮다면 useEffect 내부로 들여오면 된다.  
그러면 useCallback의 dependency도 사라진다.

```javascript
const httpData = useHttp();

const { isLoading, error, sendRequest: fetchTasks } = httpData;

useEffect(() => {
  const transformTasks = (tasksObj) => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({
        id: taskKey,
        text: tasksObj[taskKey].text,
      });
    }
    console.log(loadedTasks);

    setTasks(loadedTasks);
  };

  fetchTasks(
    {
      url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTasks
  );
}, [fetchTasks]);
```

```javascript
const sendRequest = useCallback(async (requestConfig, applyData) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json();
    applyData(data);
  } catch (err) {
    setError(err.message || "Something went wrong!");
  }
  setIsLoading(false);
}, []);
```

이제 useHttp는 의존성이나 어떠한 매개변수 없이도 호출이 가능합니다.
왜냐하면 우리가 요청에 대한 설정과 데이터 전송 후 적용되어야 할 데이터 변환을 직접 보내기 때문이죠.

## NewTask에 적용하기

### 첫번째 방법

```javascript
const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const createTask = (taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };
    sendTaskRequest(
      {
        url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask
    );
  };

```

### 두번째 방법: bind() 쓰기

```javascript
const createTask = (taskText, taskData) => {
  const generatedId = taskData.name; // firebase-specific => "name" contains generated id
  const createdTask = { id: generatedId, text: taskText };
  props.onAddTask(createdTask);
};
const enterTaskHandler = async (taskText) => {
  sendTaskRequest(
    {
      url: "https://react-http-8963a-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    },
    createTask.bind(null, taskText)
  );
};
```
