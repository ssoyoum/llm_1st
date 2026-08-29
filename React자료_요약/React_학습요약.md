# React 학습 요약

> `React자료`의 01~14단원과 `실습프로젝트/src`의 예제 코드를 다시 볼 때 사용하는 복습용 문서입니다.
> 세부 설명과 실행 예제는 원본 자료를 함께 보세요.

## 가장 빠른 예제 실행법

09~14단원 예제는 모두 같은 화면에서 엽니다.

```powershell
cd "React자료\실습프로젝트"
npm run dev
```

브라우저에서 <http://localhost:5173/>을 열고 왼쪽 메뉴에서 단원과 파일을 선택합니다.

예를 들어 **11 React Router → 개념 01 라우터 기본**을 열면 됩니다. `useRef`, Context, TypeScript 등도 같은 방식으로 해당 단원을 클릭합니다.

처음 실행하는 컴퓨터라면 한 번만 `npm install`을 먼저 실행합니다. 서버를 끌 때는 터미널에서 `Ctrl + C`를 누릅니다.

## 0. 전체 학습 흐름

| 단원 | 핵심 질문 | 배울 것 |
| --- | --- | --- |
| 01 React 시작 | 왜 React를 쓰고 어떻게 화면을 그리나? | 선언형 UI, 컴포넌트, 렌더링 |
| 02 JSX | JavaScript 안에서 화면을 어떻게 쓰나? | JSX 문법과 표현식 |
| 03 컴포넌트와 props | 화면을 어떻게 재사용하나? | 컴포넌트 분리, props, children |
| 04 state와 이벤트 | 사용자 동작에 따라 화면을 어떻게 바꾸나? | 이벤트, `useState`, 리렌더링 |
| 05 조건부 렌더링과 리스트 | 데이터에 따라 무엇을 보여 주나? | 조건문, `map`, `filter`, `key` |
| 06 폼과 입력 | 입력값을 어떻게 관리하나? | 제어 컴포넌트, 제출, 체크박스 |
| 07 state 설계와 불변성 | state를 어디에 두고 어떻게 바꾸나? | 배열·객체 복사, state 끌어올리기 |
| 08 Vite | React 프로젝트를 어떻게 실행·구성하나? | npm, Vite, import/export, CSS |
| 09 `useEffect`와 API | 외부 세계와 어떻게 동기화하나? | effect, fetch, 로딩·에러, 정리 |
| 10 `useRef`와 커스텀 훅 | DOM·이전 값·반복 로직을 어떻게 다루나? | ref, custom hook, `memo` 계열 |
| 11 React Router | 주소에 따라 화면을 어떻게 바꾸나? | route, Link, params, 중첩 라우트 |
| 12 Context와 `useReducer` | 깊은 컴포넌트에 state를 어떻게 공유하나? | Context, reducer, dispatch |
| 13 종합 프로젝트 | 배운 내용을 어떻게 조립하나? | 할 일, 장바구니, 검색, 메모장 |
| 14 TypeScript | React 코드의 실수를 어떻게 줄이나? | 타입, props, state, 이벤트 타입 |

### 추천 복습 순서

1. JavaScript의 `map`, `filter`, 구조분해, 스프레드 문법을 먼저 복습한다.
2. 01~04단원으로 JSX·컴포넌트·state를 익힌다.
3. 05~07단원에서 목록·폼·state 설계를 연습한다.
4. 08단원에서 Vite 프로젝트 실행법을 익힌다.
5. 09~12단원을 순서대로 공부한다. 뒤 단원은 앞 단원의 state·props를 전제로 한다.
6. 13단원 프로젝트를 직접 만든 뒤 정답과 비교한다.
7. 14단원 TypeScript는 JavaScript React가 익숙해진 뒤 붙인다.

## 1. React의 기본 생각

### 명령형과 선언형

- 명령형: DOM을 직접 선택하고 `textContent`, `classList`, `append` 등을 이용해 “어떻게” 바꿀지 지시한다.
- 선언형: 현재 데이터에 맞는 화면을 JSX로 설명한다. 데이터가 바뀌면 React가 필요한 부분을 다시 반영한다.
- React가 DOM 업데이트를 맡지만, 데이터 구조·이벤트·화면 설계는 개발자가 정해야 한다.

### 첫 화면

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- `index.html`에 React가 붙을 자리인 `<div id="root"></div>`가 있어야 한다.
- `createRoot(...)`는 React 앱의 뿌리를 만든다.
- `.render(<App />)`가 실제 화면을 그리도록 요청한다.
- 컴포넌트 함수 이름은 반드시 대문자로 시작한다. `App`, `MenuCard`는 컴포넌트이고 `app`, `menuCard`는 일반 HTML 태그로 해석될 수 있다.

### 리렌더링

- 컴포넌트 함수는 화면이 필요할 때 다시 실행된다.
- state가 바뀌면 해당 컴포넌트가 다시 실행되고, 부모가 다시 실행되면 자식도 기본적으로 다시 실행된다.
- “다시 실행”은 DOM 전체를 무조건 지우고 새로 만드는 뜻이 아니다. React가 이전 결과와 비교해 필요한 부분을 반영한다.
- 일반 변수는 렌더링이 다시 시작되면 다시 만들어진다. 계속 기억해야 하는 값은 state 또는 ref에 둔다.

## 2. JSX 문법

JSX는 JavaScript 안에서 UI 구조를 작성하는 문법이다. 브라우저가 JSX를 직접 이해하는 것은 아니며 Vite/Babel 같은 도구가 JavaScript로 변환한다.

```jsx
function MenuCard({ name, price }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>{price.toLocaleString()}원</p>
    </article>
  );
}
```

### 꼭 기억할 규칙

- JavaScript 값을 넣을 때 `{}`를 사용한다: `<p>{name}</p>`
- 중괄호 안에는 문(statement)이 아니라 값이 나오는 식(expression)을 넣는다.
  - 가능: `{name}`, `{price * 2}`, `{isOpen ? "열림" : "닫힘"}`, `{items.map(...)}`
  - 불가: `{if (...) {}}`, `{for (...) {}}` → 미리 변수로 계산하거나 삼항·`map`을 사용한다.
- 문자열 속성은 따옴표, 숫자·변수·객체·불리언은 중괄호를 사용한다.
  - `<img src="/logo.svg" />`
  - `<img src={imageUrl} width={120} />`
- HTML의 `class`는 JSX에서 `className`, `for`는 `htmlFor`다.
- `style`은 객체로 쓴다. CSS 속성은 camelCase다.
  - `<p style={{ color: "tomato", marginTop: 8 }}>...</p>`
- 여러 요소를 반환하려면 하나의 부모로 감싼다. 실제 DOM 요소를 추가하지 않으려면 Fragment를 쓴다.
  - `<>제목<p>내용</p></>`
- `<input>`, `<img>`, `<br>`처럼 자식이 없는 태그는 반드시 닫는다: `<input />`
- 여러 줄 JSX는 `return (`과 `)`으로 감싼다. `return` 다음 줄에 JSX를 바로 놓으면 JavaScript의 자동 세미콜론 삽입 때문에 `undefined`가 될 수 있다.
- JSX 주석은 `{/* 주석 */}` 형태다.

## 3. 컴포넌트, props, children

### 컴포넌트

컴포넌트는 JSX를 반환하는 함수다. 반복되는 화면 조각을 함수로 만들고, 값만 props로 바꿔 재사용한다.

```jsx
function Greeting({ name = "손님" }) {
  return <h2>{name}님, 안녕하세요.</h2>;
}

function App() {
  return (
    <>
      <Greeting name="민준" />
      <Greeting />
    </>
  );
}
```

### props

- 부모가 자식에게 전달하는 읽기 전용 객체다.
- 데이터 흐름은 기본적으로 위에서 아래다.
- 문자열은 따옴표, 나머지는 중괄호로 전달한다.
  - `<Card title="메뉴" price={4000} available={true} />`
- 구조분해로 간단히 받을 수 있다: `function Card({ title, price }) { ... }`
- 기본값을 줄 수 있다: `function Card({ title = "제목 없음" }) { ... }`
- props 자체나 props 안의 객체를 자식이 직접 바꾸면 안 된다. 바꿔야 할 값이면 state를 소유한 쪽에서 변경 함수를 전달한다.

### children

태그 사이에 넣은 내용은 `children` prop으로 들어온다.

```jsx
function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

<Panel title="공지">
  <p>오늘은 휴무입니다.</p>
</Panel>;
```

겉모양을 담당하는 컴포넌트는 `children`이라는 구멍을 제공하고, 실제 내용은 사용하는 곳에서 넣으면 재사용성이 좋아진다.

## 4. 이벤트와 `useState`

### 이벤트 연결

```jsx
function Button() {
  const handleClick = (event) => {
    console.log(event.currentTarget.textContent);
  };

  return <button onClick={handleClick}>확인</button>;
}
```

- JSX 이벤트 이름은 camelCase: `onClick`, `onChange`, `onSubmit`.
- 함수 자체를 전달한다: `onClick={handleClick}`.
- `onClick={handleClick()}`은 렌더링 중 즉시 실행되므로 보통 잘못된 코드다.
- 인자를 넘기려면 화살표 함수로 감싼다: `onClick={() => removeItem(id)}`.
- 이벤트 객체는 함수 매개변수로 받는다. 입력값은 보통 `event.target.value`로 읽는다.

### `useState`

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

- `useState(초기값)`은 `[현재값, setter]` 두 칸을 반환한다.
- setter를 호출하면 state를 저장하고 다시 렌더링한다.
- 같은 컴포넌트를 여러 번 사용해도 각 인스턴스의 state는 별개다.
- state는 렌더링 결과에 필요한 값이어야 한다. `total`처럼 다른 state로 계산할 수 있는 값은 별도 state로 두지 않는다.
- setter 직후에 읽은 변수는 아직 현재 렌더링의 옛값이다. 다음 화면에서 반영된다.

### 이전 값으로 갱신하기

새 값이 직전 값에 의존하면 함수형 갱신을 쓴다.

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // 한 번의 클릭으로 2 증가
```

특히 같은 이벤트에서 여러 번 갱신하거나 비동기 작업 후 갱신할 때 안전하다.

### state 변경 규칙

state 배열·객체를 직접 수정하지 말고 새 값을 만들어 setter에 전달한다.

```jsx
// 배열
setItems((prev) => [...prev, newItem]);
setItems((prev) => prev.filter((item) => item.id !== id));
setItems((prev) => prev.map((item) =>
  item.id === id ? { ...item, done: !item.done } : item
));

// 객체
setUser((prev) => ({ ...prev, name: "서연" }));

// 중첩 객체: 바뀌는 모든 단계까지 복사
setUser((prev) => ({
  ...prev,
  address: { ...prev.address, city: "부산" },
}));
```

`push`, `pop`, `splice`, `sort`, `reverse`처럼 원본을 바꾸는 메서드는 state에 직접 사용하지 않는다.

### Hook 규칙

- Hook은 컴포넌트 함수 또는 `use`로 시작하는 커스텀 훅 안에서만 호출한다.
- 컴포넌트 최상위에서 항상 같은 순서로 호출한다.
- `if`, `for`, 이벤트 핸들러, 일반 함수 안에서 `useState` 등을 호출하지 않는다.

## 5. 조건부 렌더링과 리스트

### 조건부 렌더링

```jsx
{isLoggedIn ? <UserMenu /> : <LoginButton />}
{isLoading && <p>불러오는 중...</p>}
```

- 두 화면 중 하나: 삼항 연산자 `조건 ? A : B`.
- 있을 때만: `조건 && <화면>`.
- `0 && <p>...</p>`는 `0`을 반환하고 React가 숫자 `0`을 화면에 그릴 수 있다. 배열 길이는 `{items.length > 0 && ...}`처럼 비교식으로 쓴다.
- 화면 전체가 달라지면 조건문 후 일찍 `return`하는 방식도 읽기 좋다.

### 리스트

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

- 배열은 `map`으로 JSX 배열로 바꾼다.
- `key`는 React가 각 항목의 정체성을 추적하기 위한 안정적인 고유값이다.
- 가능하면 데이터의 `id`를 사용한다. 단순히 순서가 바뀌지 않는 고정 목록이 아니라면 배열 index를 key로 쓰지 않는다.
- `filter`와 `map`을 연결해 조건에 맞는 항목만 그릴 수 있다.
  - `items.filter((item) => item.done).map(...)`
- 빈 배열에 `map`을 해도 에러는 나지 않지만 화면에는 아무것도 안 나온다. 사용자가 이해할 수 있는 빈 상태 문구를 따로 보여 준다.
- `map` 안에서 조건부로 다른 화면을 보여 줄 수 있다.

## 6. 폼과 입력

### 제어 컴포넌트

입력값을 React state가 관리하도록 만든다.

```jsx
function SearchForm() {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(keyword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button type="submit">검색</button>
    </form>
  );
}
```

- 텍스트 입력: `value` + `onChange`.
- 폼 제출: `onSubmit`에서 `event.preventDefault()`로 브라우저의 새로고침을 막는다.
- `button`의 기본 타입은 상황에 따라 submit이 될 수 있으므로 폼 안의 일반 버튼은 `type="button"`을 명시한다.
- 입력값은 HTML에서 항상 문자열이다. 숫자로 계산하려면 `Number(event.target.value)` 등으로 변환한다.

### 여러 입력·체크박스·select

```jsx
const [form, setForm] = useState({ name: "", phone: "" });

function handleChange(event) {
  const { name, value } = event.target;
  setForm((prev) => ({ ...prev, [name]: value }));
}
```

- `name`을 state의 키로 사용하면 입력 핸들러 하나로 여러 텍스트 입력을 처리할 수 있다.
- 체크박스는 `value`가 아니라 `checked`를 읽고 쓴다.
  - `<input type="checkbox" checked={agreed} onChange={...} />`
- select는 `value`와 `onChange`를 연결한다.
- 체크박스가 여러 개면 배열에 추가·삭제할 때 새 배열을 만든다.

## 7. state 설계와 컴포넌트 사이 통신

### state를 어디에 둘까?

state를 실제로 읽고 변경하는 컴포넌트 중 가장 가까운 공통 부모에 둔다. 이것이 “state 끌어올리기”다.

```jsx
function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <MenuList selectedId={selectedId} onSelect={setSelectedId} />
      <MenuDetail selectedId={selectedId} />
    </>
  );
}
```

- state의 원본은 한 곳에만 둔다. 같은 값을 여러 컴포넌트에서 따로 저장하면 서로 어긋날 수 있다.
- props는 부모에서 자식으로 내려간다.
- 자식이 부모에게 알리려면 부모가 함수를 prop으로 내려보낸다.

```jsx
function Parent() {
  const [message, setMessage] = useState("");
  return <Child onSend={setMessage} />;
}

function Child({ onSend }) {
  return <button onClick={() => onSend("자식의 알림")}>알리기</button>;
}
```

### 파생 값은 계산한다

```jsx
const completedCount = todos.filter((todo) => todo.done).length;
const total = price * quantity;
```

이런 값은 state로 중복 저장하지 않는다. 원본 state가 바뀌면 렌더링 중 계산하면 된다. 성능 문제가 실제로 확인될 때만 `useMemo`를 검토한다.

## 8. Vite 프로젝트 실행과 파일 구조

### 현재 실습 프로젝트 실행

```powershell
cd "React자료\실습프로젝트"
npm install       # 처음 한 번 또는 node_modules가 없을 때
npm run dev
```

브라우저에서 `http://localhost:5173/`을 열고 왼쪽 메뉴에서 단원을 선택한다. 개발 서버는 저장하면 화면을 빠르게 갱신한다. 종료는 터미널에서 `Ctrl + C`다.

### 구조

- `index.html`: `#root`가 있는 시작 HTML.
- `src/main.jsx`: `createRoot`로 `App`을 연결하는 진입점.
- `src/App.jsx`: 예제 파일을 찾아 왼쪽 메뉴에서 선택하게 하는 자료용 앱.
- `src/08_...` 이후: Vite에서 실행되는 JSX/TSX 예제.
- `src/_ui`: 자료 전체가 공유하는 `ErrorBox`, `Summary` 같은 부품.
- `package.json`: 실행 명령과 의존성.
- `node_modules`: 설치된 패키지. 직접 수정하지 않는다.
- `public`: import 없이 그대로 제공할 정적 파일.

### import/export

```jsx
// Greeting.jsx
export default function Greeting({ name }) {
  return <h1>{name}</h1>;
}

// App.jsx
import Greeting from "./Greeting.jsx";
```

- `export default`는 파일의 기본 내보내기 하나다. import할 때 이름을 바꿀 수 있다.
- named export는 `export function Card() {}` / `import { Card } from "./Card.jsx"`처럼 중괄호를 사용한다.
- 파일을 나누면 컴포넌트·데이터·스타일의 책임이 분리된다.
- 일반 CSS는 전역으로 적용되고, CSS Module은 `import styles from "./Card.module.css"` 후 `className={styles.card}`처럼 쓴다.

## 9. `useEffect`와 API

### effect란?

렌더링 결과를 외부 시스템과 동기화하는 작업이다.

- 브라우저 탭 제목, 타이머, 이벤트 구독, 네트워크 요청처럼 React 바깥의 일을 다룰 때 사용한다.
- 컴포넌트 본문은 화면 계산, 이벤트 핸들러는 사용자의 동작, effect는 렌더링 이후 외부 시스템 동기화라는 기준으로 나눈다.

```jsx
useEffect(() => {
  document.title = `${count}개`;
}, [count]);
```

### 의존성 배열

```jsx
useEffect(() => {
  // 렌더링 후 매번 실행
});

useEffect(() => {
  // 마운트 후 한 번 실행(개발 StrictMode에서는 확인을 위해 두 번처럼 보일 수 있음)
}, []);

useEffect(() => {
  // userId가 바뀔 때 실행
}, [userId]);
```

effect 안에서 읽는 반응형 값은 의존성 배열에 넣어야 옛값을 보지 않는다. effect가 필요 없는 계산을 effect로 만들면 지연·무한 루프·중복 state가 생기기 쉽다.

### 정리 함수

타이머·이벤트·구독처럼 시작한 것을 effect가 끝날 때 해제한다.

```jsx
useEffect(() => {
  const timerId = setInterval(tick, 1000);
  window.addEventListener("resize", handleResize);

  return () => {
    clearInterval(timerId);
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

의존성이 바뀌어 effect를 다시 실행할 때도 이전 정리 함수가 먼저 실행된다.

### fetch 패턴

effect 콜백 자체를 `async`로 만들지 말고 안쪽 함수를 만든다.

```jsx
useEffect(() => {
  let ignore = false;

  async function load() {
    setStatus({ kind: "loading", data: null, error: null });
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("요청에 실패했습니다.");
      const data = await response.json();
      if (!ignore) setStatus({ kind: "success", data, error: null });
    } catch (error) {
      if (!ignore) setStatus({ kind: "error", data: null, error });
    }
  }

  load();
  return () => { ignore = true; };
}, [userId]);
```

- 첫 렌더에는 아직 데이터가 없다. `null`을 고려한 화면을 만든다.
- 화면 상태를 `loading / error / success`로 나누면 사용자가 현재 상황을 알 수 있다.
- `fetch`는 404·500에서 자동으로 catch되지 않으므로 `response.ok`를 직접 확인한다.
- 검색어·ID가 빠르게 바뀌면 이전 요청이 늦게 도착해 최신 결과를 덮을 수 있다. 정리 시 `ignore`를 켜거나 `AbortController`로 이전 요청을 취소한다.
- 개발용 `StrictMode`에서 effect가 두 번 실행되는 것처럼 보일 수 있다. 정리 함수가 올바른지 확인하는 동작이지, 보통 프로덕션의 중복 실행을 뜻하지 않는다.

## 10. `useRef`, 커스텀 훅, 성능 최적화

### `useRef`로 DOM 다루기

```jsx
const inputRef = useRef(null);

function focusInput() {
  inputRef.current?.focus();
}

return (
  <>
    <input ref={inputRef} />
    <button onClick={focusInput}>입력칸에 포커스</button>
  </>
);
```

- `useRef(initialValue)`는 `{ current: initialValue }` 모양의 상자를 만든다.
- JSX 요소에 `ref={inputRef}`를 붙이면 React가 렌더링 후 `inputRef.current`에 실제 DOM 요소를 넣는다.
- `current`로 `focus()`, `scrollIntoView()`, `value` 등을 사용할 수 있다.
- DOM을 직접 바꾸는 것은 포커스·스크롤·측정처럼 React만으로 하기 어려운 최소한의 경우에만 사용한다. 화면에 표시할 내용은 state로 관리한다.

### state와 ref의 차이

| 구분 | `useState` | `useRef` |
| --- | --- | --- |
| 값 변경 | setter 사용 | `ref.current = 값` |
| 변경 후 리렌더링 | 발생 | 발생하지 않음 |
| 용도 | 화면에 보여 줄 값 | DOM, 타이머 ID, 이전 값 등 |
| 다음 렌더에도 유지 | 예 | 예 |

```jsx
const timerRef = useRef(null);

function start() {
  timerRef.current = setInterval(tick, 1000);
}

function stop() {
  clearInterval(timerRef.current);
  timerRef.current = null;
}
```

일반 `let timerId`는 렌더링 때마다 초기화될 수 있으므로 렌더와 무관하게 유지할 값은 ref에 둔다. 반대로 ref에 숫자를 넣어 놓고 화면에 바로 표시되길 기대하면 안 된다.

### 커스텀 훅

반복되는 state·effect·이벤트 로직을 `use`로 시작하는 함수로 묶는다.

```jsx
function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => setValue(event.target.value);
  return { value, onChange, setValue };
}

function LoginForm() {
  const email = useInput("");
  const password = useInput("");
  return <input {...email} />;
}
```

- 커스텀 훅은 UI를 반환하는 컴포넌트가 아니라 재사용할 로직을 반환한다.
- 같은 훅을 두 번 호출하면 state도 두 묶음으로 분리된다.
- 훅 안에서 `useState`, `useEffect`, `useRef`를 사용할 수 있다.
- 커스텀 훅도 Hook 규칙을 지킨다.

### `memo`, `useMemo`, `useCallback`

- `useMemo(() => expensiveWork(data), [data])`: 의존성이 같을 때 무거운 계산 결과를 재사용한다.
- `memo(Child)`: props가 같으면 부모가 다시 렌더링되어도 자식 렌더링을 건너뛸 수 있다.
- `useCallback(() => doSomething(id), [id])`: 함수 자체의 참조를 재사용한다. `memo` 자식에게 함수를 prop으로 넘길 때 의미가 있다.
- 먼저 일반 코드로 만들고 실제 성능 문제가 확인될 때 사용한다. 최적화 도구를 무조건 붙이면 코드가 복잡해지고 효과가 없을 수 있다.
- 부모에서 매 렌더마다 새 객체·배열·함수를 만들면 props가 달라진 것으로 판단될 수 있다.

## 11. React Router

라우터는 URL과 화면 컴포넌트를 연결한다. 실습 프로젝트에서는 개념 예제를 파일별로 선택하지만, 실제 앱에서는 URL에 따라 화면을 관리한다.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 이동과 메뉴

- `<Link to="/about">소개</Link>`: 페이지 전체를 새로고침하지 않는 내부 이동.
- `<NavLink>`: 현재 URL과 일치할 때 active 스타일을 붙이기 좋다.
- `<a href="https://...">`는 외부 링크나 브라우저 기본 이동이 필요한 경우 사용한다.
- 코드에서 이동하려면 `const navigate = useNavigate(); navigate("/about")`.
- `navigate(-1)`은 뒤로 가기, `{ replace: true }`는 history 기록을 교체한다.

### 파라미터와 중첩 라우트

```jsx
<Route path="/users/:id" element={<UserDetail />} />

function UserDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  // URL 파라미터는 문자열이므로 필요한 경우 변환
  return <p>{numericId}</p>;
}
```

중첩 라우트는 부모 껍데기 안에 자식 화면을 끼우는 구조다.

```jsx
<Route path="/settings" element={<SettingsLayout />}>
  <Route index element={<Profile />} />
  <Route path="security" element={<Security />} />
</Route>
```

부모 컴포넌트의 원하는 위치에 `<Outlet />`을 둔다. 자식 주소는 보통 `security`처럼 앞에 `/` 없이 적는다.

## 12. Context와 `useReducer`

### Context

여러 단계의 중간 컴포넌트가 사용하지 않는 값을 계속 전달하는 prop drilling을 줄인다.

```jsx
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>버튼</button>;
}
```

- `createContext(defaultValue)`로 전달 통로를 만든다.
- `Provider`의 `value`를 자손 어디서든 `useContext`로 읽는다.
- Provider 바깥에서는 기본값이 사용된다. 기본값을 실제 값처럼 착각하지 않도록 `null`을 기본값으로 두고 커스텀 훅에서 에러를 내는 방식도 있다.
- Context는 앱 전체의 전역 변수라기보다 Provider가 감싼 범위에만 적용된다. Provider를 두 개 두면 독립된 값 공간도 만들 수 있다.
- `value={{ user, setUser }}`처럼 매 렌더마다 새 객체를 만들면 소비자들이 불필요하게 다시 렌더링될 수 있다. 필요할 때 `useMemo`를 검토한다.
- Context는 prop 전달 문제를 해결할 뿐, 모든 state를 Context에 넣어야 한다는 뜻은 아니다. 먼저 state 끌어올리기와 `children` 구조를 검토한다.

### `useReducer`

상태 변경 종류가 많거나 서로 연결된 state를 한 곳에서 관리할 때 사용한다.

```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <button onClick={() => dispatch({ type: "add", item })}>
      담기 ({cart.length})
    </button>
  );
}
```

- reducer는 `(현재 state, action) => 다음 state`를 반환하는 순수 함수다.
- 컴포넌트는 구체적인 state 조작 대신 `dispatch(action)`을 보낸다.
- action에는 보통 `type`과 필요한 데이터(payload)를 넣는다.
- reducer에서 state를 직접 수정하지 않는다. 항상 새 배열·객체를 반환한다.
- `useState`는 단순한 state에, `useReducer`는 변경 규칙이 많고 테스트·추적이 필요한 state에 적합하다.

### Context + reducer 조합

대규모 장바구니 같은 기능은 다음처럼 분리하면 좋다.

1. reducer가 state와 action 처리 규칙을 담당한다.
2. Provider가 `useReducer`를 실행하고 state·dispatch를 내려준다.
3. `useCart()` 같은 커스텀 훅이 `useContext`를 감싸 사용법을 단순하게 만든다.
4. 화면 컴포넌트는 `dispatch({ type: "add", ... })`만 호출한다.

## 13. 종합 프로젝트에서 보는 설계

### 할 일 목록

- 입력칸은 제어 컴포넌트로 만든다.
- 할 일 배열은 부모 state로 둔다.
- 추가는 `[...todos, newTodo]`, 삭제는 `filter`, 완료 토글은 `map`으로 새 배열을 만든다.
- 목록에는 `todo.id`를 key로 사용한다.
- 완료 개수·필터 결과처럼 계산 가능한 값은 렌더링 중 계산한다.

### 장바구니

- 상품 데이터와 장바구니 state를 분리한다.
- 수량 변경·추가·삭제·합계처럼 변경 종류가 많으면 reducer가 잘 맞는다.
- 총액은 `items.reduce(...)`로 계산하고 별도 state로 중복 저장하지 않는다.
- 여러 컴포넌트가 장바구니를 공유해야 하면 Context + reducer를 사용한다.

### 사용자 검색

- 검색 대상 ID나 키워드를 state로 관리한다.
- 값이 바뀌면 effect에서 API를 호출한다.
- `loading / error / success` 세 상태를 화면에 표현한다.
- 오래된 응답이 최신 검색 결과를 덮지 않도록 정리·취소 처리를 한다.

### 메모장

- 메모 목록·선택된 메모·입력값의 소유 위치를 먼저 정한다.
- 선택된 메모가 없을 수 있으므로 `null` 상태를 처리한다.
- 객체 state를 수정할 때 `{ ...memo, content: nextContent }`처럼 새 객체를 만든다.
- 저장·삭제처럼 사용자 클릭으로 발생한 일은 이벤트 핸들러에서 처리하고, effect는 외부 저장소 동기화처럼 꼭 필요한 경우에 사용한다.

## 14. TypeScript 부록

TypeScript는 실행 중 값을 검사하는 것이 아니라 작성·빌드 단계에서 타입 오류를 알려 준다.

### 기본 타입과 별칭

```tsx
type User = {
  id: number;
  name: string;
  nickname?: string;
};

type Status = "idle" | "loading" | "success" | "error";

const names: string[] = ["민준", "서연"];
const user: User = { id: 1, name: "민준" };
```

- `string`, `number`, `boolean`을 기본으로 사용한다.
- 배열은 `string[]` 또는 `Array<string>`으로 쓴다.
- `type`으로 객체 모양에 이름을 붙인다.
- `?`는 선택 속성이다. 기본값을 준다는 뜻과는 다르다.
- 유니온은 정해진 타입 중 하나다: `type Status = "idle" | "loading"`.
- `useState([])`처럼 초기값만으로 원소 타입을 알 수 없으면 `useState<string[]>([])`처럼 지정한다.
- 선택된 객체가 없을 수 있으면 `useState<Menu | null>(null)`처럼 쓴다.

### props 타입

```tsx
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  price?: number;
  children?: ReactNode;
  onSelect: (id: number) => void;
};

function Card({ title, price = 0, children, onSelect }: CardProps) {
  return <button onClick={() => onSelect(1)}>{title}: {price}{children}</button>;
}
```

- props 객체의 타입을 `type`으로 선언한다.
- `children`은 JSX, 문자열, 숫자 등을 받을 수 있으므로 보통 `ReactNode`를 사용한다.
- 함수 prop은 매개변수와 반환 타입을 적는다: `(id: number) => void`.

### state와 이벤트 타입

```tsx
const [items, setItems] = useState<string[]>([]);
const [selected, setSelected] = useState<Menu | null>(null);

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setKeyword(event.target.value);
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  // 버튼 클릭 처리
}
```

- 입력칸 `value`는 TypeScript에서도 문자열이다.
- `useState(0)`처럼 초기값으로 타입 추론이 가능한 경우 타입을 생략해도 된다.
- 빈 배열·`null` 초기값은 타입을 명시하는 편이 안전하다.
- 타입은 실행 중 자동 검사가 아니다. 서버로 받은 데이터는 필요하면 별도 검증을 해야 한다.

## 15. 자주 나는 오류와 확인 순서

### 화면이 비어 있을 때

1. 터미널의 빨간 오류와 브라우저 F12 Console을 먼저 읽는다.
2. 파일을 저장했는지 확인한다.
3. JSX 괄호·태그가 모두 닫혔는지 확인한다.
4. 컴포넌트 이름이 대문자로 시작하는지 확인한다.
5. 컴포넌트가 JSX를 `return`하는지 확인한다.
6. `#root`가 있고 `createRoot(...).render(...)`가 실행되는지 확인한다.
7. Vite 프로젝트라면 올바른 폴더에서 `npm run dev`를 실행했는지 확인한다.

### 자주 나오는 실수

| 증상 | 원인·해결 |
| --- | --- |
| 버튼을 눌러도 반응 없음 | `onClick={fn}`을 썼는지 확인. `onClick={fn()}`은 즉시 실행됨 |
| state가 화면에 안 반영됨 | 배열·객체를 직접 수정하지 말고 새 값을 setter에 전달 |
| 목록 경고 | `map` 결과에 안정적인 `key` 추가 |
| 화면에 `0`이 뜸 | `items.length && ...` 대신 `items.length > 0 && ...` |
| 입력값이 사라짐 | `value`와 `onChange`를 함께 연결하고 state를 갱신 |
| 폼 제출 후 새로고침 | `onSubmit`에서 `event.preventDefault()` |
| effect 무한 실행 | effect 안에서 바꾸는 값이 의존성에 다시 영향을 주는지 확인 |
| API 404인데 성공 화면 | `response.ok`를 확인하고 에러 state로 전환 |
| 오래된 API 결과가 보임 | cleanup에서 이전 요청 결과를 무시하거나 취소 |
| ref 값을 바꿨는데 화면이 안 바뀜 | ref는 리렌더링을 일으키지 않음. 화면 값은 state 사용 |
| Hook 관련 에러 | Hook을 컴포넌트 최상위에서 항상 같은 순서로 호출 |
| 내부 링크에서 전체 새로고침 | React Router 내부 이동은 `<Link>` 사용 |
| URL id 비교 실패 | `useParams()` 값은 문자열이므로 `Number(id)` 등 변환 |
| Context 값이 이상함 | 원하는 컴포넌트가 Provider 안에 있는지 확인 |

## 16. 원본 자료와 실행 위치

- 01~07단원: `React자료/01_React_시작하기`부터 `React자료/07_state_설계와_불변성`까지의 HTML을 브라우저로 직접 연다.
- 08단원 문서: `React자료/08_Vite로_옮기기`.
- 09~14단원 예제: `React자료/실습프로젝트`를 실행한 뒤 왼쪽 메뉴에서 선택한다.
- useRef 예제 위치: `React자료/실습프로젝트/src/10_useRef와_커스텀_훅`.

```powershell
cd "React자료\실습프로젝트"
npm run dev
```

처음에는 01~04단원의 개념 파일을 순서대로 읽고, 각 단원의 `연습문제.html` 또는 실습 프로젝트의 `연습문제.jsx`를 직접 고쳐 보는 것이 가장 좋다. 정답 파일은 먼저 시도한 다음 비교용으로 사용한다.
