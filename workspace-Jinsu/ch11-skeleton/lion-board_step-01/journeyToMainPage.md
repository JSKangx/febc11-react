## 브라우저 최초 접속

- `npm run dev` 명령어 입력
- 리액트는 lion-board/index.html 응답
- 브라우저가 index.html 파싱

- main.jsx 실행

  - App 컴포넌트 로딩 > 결과를 `div#root` 하위에 렌더링하라는 명령어 실행

- App 렌더링

  - `<RouterProvider>`를 렌더링
  - `<RouterProvider>`는 `router` 속성에 있는 라우팅 규칙에 의해 컴포넌트 렌더링
  - 라우팅 규칙은 `routes.jsx`에 정의되어 있음.

- 라우팅 규칙에 의해 '/'로 접근하면 `<Layout>` 컴포넌트 렌더링

  - `<Layout>` 컴포넌트는 고정적으로 헤더와 푸터를 렌더링하고, 라우팅 규칙에 의해 `<Outlet>` 자리에 하위 컴포넌트를 동적으로 렌더링
  - 현재는 '/' 경로로 들어왔을 때 `<Outlet>` 자리에 `<MainPage>`를 렌더링 하도록 되어있음

- 결국, `<RouterProvider>`는 헤더, 메인, 푸터를 렌더링하고, 그게 앱의 렌더링 결과임.
