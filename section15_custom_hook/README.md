# 커스텀 훅 재사용

hooks 폴더 안에 `use`로 시작하는 컴포넌트를 만들자
주의> 반드시 `use`로 시작해야함
ForwardCounter 컴포넌트와 BackwardCounter 컴포넌트는 매우 닮아있다.
재사용하기 위해 커스텀 훅을 사용한다.

```
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

```
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

```
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
```
const ForwardCounter = () => {
  const counter = useCounter(true);
  return <Card>{counter}</Card>;
};
```

```
const BackwardCounter = () => {
  const counter = useCounter(false);
  return <Card>{counter}</Card>;
};
```

***
# 현실적인 예제
