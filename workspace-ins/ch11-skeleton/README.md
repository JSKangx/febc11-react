# Lion Board 앱

## 샘플 페이지 확인
* sample/07/workspace/ch11-skeleton 폴더를 workspace에 복사
* workspace/ch11-skeleton/sample 폴더에서 다음 명령 실행
```sh
npx serve .
```

* 브라우저에서 페이지 이동 테스트

# 1단계
* HTML 코드를 기반으로 리액트 컴포넌트 생성
* 리액트 라우터 적용

## 프로젝트 생성
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch02-start#vite
* workspace/ch11-skeleton 폴더에서 다음 명령 실행
  ```sh
  npm init vite@latest
  ```
  - Project name: lion-board
  - Select a framework: React
  - Select a variant: JavaScript

  ```sh
  # 생성한 프로젝트 폴더로 이동
  cd lion-board
  # 기본 패키지 설치
  npm i
  # 추가 패키지 설치
  npm i prop-types react-router-dom react-hook-form axios @tanstack/react-query @tanstack/react-query-devtools react-spinners react-toastify recoil recoil-persist zustand
  npm i -D tailwindcss postcss autoprefixer
  # 개발 서버 실행
  npm run dev
  ```

## 프로젝트 설정
### alias 추가
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch02-start#viteconfigjs

#### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@recoil", replacement: "/src/recoil" },
      { find: "@zustand", replacement: "/src/zustand" },
    ],
  },
})
```
#### jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["/*"],
      "@components/*": ["components/*"],
      "@pages/*": ["pages/*"],
      "@hooks/*": ["hooks/*"],
      "@recoil/*": ["recoil/*"],
      "@zustand/*": ["zustand/*"],
    }
  }
}
```

### Tailwind CSS 설정
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch08-css#%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EC%83%9D%EC%84%B1

* tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

* src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 정적인 자원 처리
* sample/images 폴더를 lion-board/public 폴더에 복사
* favicon 설정
  - lion-board/index.html 파일의 favicon 설정 수정
  ```html
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
  ```

## UI 컴포넌트 작성
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch02-start#2-4-jsx
* workspace/ch11-skeleton/sample 폴더의 html 코드를 컴포넌트로 이동
  - header 태그는 Header.jsx에서 사용
  - footer 태그는 Footer.jsx에서 사용
  - div id="main" 태그는 각 페이지의 컴포넌트에서 사용
  - JSX 문법에 맞게 수정

### 공통 컴포넌트
* lion-board/src/components/layout 폴더 생성후 파일 작성
* Header.jsx
  - sample/index.html의 `<header>` 영역 복사
  - JSX 문법에 맞게 수정

* Footer.jsx
  - sample/index.html의 `<footer>` 영역 복사
  - JSX 문법에 맞게 수정

### 레이아웃 컴포넌트 작성
* lion-board/src/components/layout/index.jsx 파일 작성
  ```jsx
  import Footer from "@components/Footer";
  import Header from "@components/Header";
  import { Outlet } from 'react-router-dom';

  export default function Layout(){
    return (
      <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
  ```

### 페이지별 컴포넌트
#### 메인 페이지
* sample/index.html 참고해서 lion-board/src/pages/index.jsx 파일 작성

#### 게시판 기능
* lion-board/src/pages/board 폴더 생성후 sample 폴더 html 파일의 `<main>` 태그 복사해서 완성
  - List.jsx
  - ListItem.jsx
  - New.jsx
  - Detail.jsx
  - Edit.jsx
  - CommentList.jsx
  - CommentListItem.jsx
  - CommentNew.jsx

#### 회원 기능
* lion-board/src/pages/user 폴더 생성후 sample 폴더 html 파일의 `<main>` 태그 복사해서 완성
  - Login.jsx
  - Signup.jsx

#### 에러 페이지
* sample/error.html 참고해서 lion-board/src/pages/ErrorPage.jsx 파일 작성
  ```jsx
  import Footer from "@components/Footer";
  import Header from "@components/Header";

  export default function ErrorPage() {
    return (
      <>
      <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
        <Header />
        <div className="py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
          <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
          <h3 className="text-md font-semibold mb-2 text-center">존재하지 않는 페이지입니다.</h3>
          <p className="pt-12 text-center">이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
            ⚙️ 다시 시도
          </button>
        </div>
        <Footer />
      </div>
      </>
    );
  }
  ```

### 라우터 작성
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch05-router#5%EC%9E%A5-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0
* lion-board/src/routes.jsx 파일 생성
* BrowserRouter 사용
  ```jsx
  import Layout from "@components/layout";
  import Detail from "@pages/board/Detail";
  import Edit from "@pages/board/Edit";
  import List from "@pages/board/List";
  import New from "@pages/board/New";
  import ErrorPage from "@pages/ErrorPage";
  import MainPage from "@pages/index";
  import Login from "@pages/user/Login";
  import Signup from "@pages/user/Signup";

  import { createBrowserRouter } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: ":type", element: <List /> },
        { path: ":type/new", element: <New /> },
        { path: ":type/:_id", element: <Detail /> },
        { path: ":type/_id/edit", element: <Edit /> },
        { path: "users/login", element: <Login /> },
        { path: "users/signup", element: <Signup /> },
      ]
    },
  ]);

  export default router;
  ```

### App.jsx 수정
* 리액트 라우터 추가
  ```jsx
  import { RouterProvider } from "react-router-dom";
  import router from "@/routes";

  function App() {
    return (
      <RouterProvider router={ router } />
    );
  }

  export default App;
  ```

### 링크 확인
* 링크가 제대로 동작하지 않는 부분 수정
  - a 태그 대신 Link로 수정
  - href 속성을 to로 수정
  - 링크를 라우터에 등록한 URL로 수정
* Header.jsx 예시
  ```jsx
  <Link to="/info">정보공유</Link>
  <Link to="/free">자유게시판</Link>
  <Link to="/qna">질문게시판</Link>
  ```
