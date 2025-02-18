
![logo](https://github.com/user-attachments/assets/3b874db8-04e5-49f4-a599-40dc16680b86)

## 📢프로젝트 소개

Now What Do (나와뚜)는 현재 자신이 남들과 나누고 싶은 순간이나 정보를 올려 소통할 수 있는 웹사이트입니다. 사용자는 작성 및 수정 외에도 공감하는 게시물이나 좋은 정보라고 생각되는 게시물에는 '좋아요' 버튼을 통해 작성자에게 표현할 수 있습니다.
관심사에 해당하는 카테고리를 골라 조회할 수 있습니다.
또한, 마이페이지에서 프로필, 닉네임, 작성한 게시물을 관리하는 기능을 통해 원활하게 소통할 수 있습니다.

## 📅프로젝트 기간

- **2025.02.12 ~ 2025.02.18**

## [프로젝트 계기]

- 당근마켓의 동네생활 기능에서 영감을 받아 시작했습니다.
- 다양한 관심사를 가진 사람들이 모여 서로의 이야기를 나누고 소통할 수 있는 공간을 제공합니다.
- 여러 주제가 한 공간에 섞여 사용자가 원하는 관심사나 주제를 찾는 것이 어려운 상황을 피할 수 있도록 **카테고리 제공**
- 각 주제에 대해 익명성을 보장받아 **자유롭게 글을 올리고 댓글로 소통할 수 있는 공간**을 마련했습니다.

## 💏멤버 소개

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/ImJaeOne">
        <img src="https://avatars.githubusercontent.com/u/123159312?v=4" width="80" alt="Jaeone Lim"/>
        <br />
        <sub><b>Jaeone Lim</b></sub>
        </a>
        <br />
      </td>
         <td width="300px" align="center">
        <a href="https://github.com/woohyuckk">
        <img src="https://avatars.githubusercontent.com/u/192562150?v=4" width="80" alt="woohyuckk"/>
        <br />
        <sub><b>woohyuckk</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/K-jisu">
        <img src="https://avatars.githubusercontent.com/u/90014581?v=4" width="80" alt="Jisu Kang"/>
        <br />
        <sub><b>Jisu Kang</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>홈 페이지</b> <br/>
        <b>코드 총괄</b> <br/>
      </td>
      <td align="center">
        <b>전체적인 레이아웃</b> <br/>
        <b>(헤더, 푸터, 플로팅 버튼 등)</b> <br/>
      </td>
      <td align="center">
        <b>글 작성 페이지</b> <br/>
        <b>스토리지 관리</b> <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/PureunKang">
        <img src="https://avatars.githubusercontent.com/u/144876018?v=4" width="80" alt="PureunKang"/>
        <br />
        <sub><b>PureunKang</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/lje00220">
        <img src="https://avatars.githubusercontent.com/u/155710708?v=4" width="80" alt="Jieun Lee"/>
        <br />
        <sub><b>Jieun Lee</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>상세 페이지</b> <br/>
        <b>로그인 페이지</b> <br/>
      </td>
      <td align="center">
        <b>마이 페이지</b> <br/>
        <b>회원가입 페이지</b> <br/>
      </td>
      <td align="center">
    </tr>
  </tbody>
</table>

## 🛠 **기술스택**

### 📌 **프로그래밍 언어 및 프레임워크**

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### 🎨 **UI 프레임워크 및 스타일링**

- **Styled Components**
- **React-icons**

### ✅ **코드 품질 및 포맷팅**

- **ESLint**
- **Prettier**

### 🗄️ **백엔드 및 데이터베이스**

- **Supabase (PostgreSQL 기반)**
  - **데이터베이스:** 게시글, 댓글, 좋아요, 사용자 정보 저장 및 관리
  - **인증:** 사용자 로그인 및 회원가입 관리
  - **Storage:** 프로필 이미지 등 파일 업로드 관리

### 🗃️ **버전 관리**

- **Git/GitHub**

### 🚀 **배포**
[![now-what-do](https://img.shields.io/badge/now--what--do-deployed-blue)](https://now-what-do.vercel.app/)

## 📝 **주요 기능**

## 📁 프로젝트 구조
```
├── api
├── assets
├── 📁components
│   ├── 📁common
│   └── 📁Layout
├── 📁constants
├── 📁contexts
├── 📁hooks
├── 📁pages
│   ├── 📁detail
│       ├──📁detailStyle
│   ├── 📁home
│       ├──📁homeStyle
│   ├──📁login
│       ├──📁loginStyle
│   ├── 📁myPage
│       ├──📁mypageStyle
│   ├── 📁post
│       ├──📁postStyle
│   └── signup
│       ├──📁signupStyle
├──📁 shared
├──📁 style
├──📁 supabase
├──📁 utils
├──📁 App.jsx
└──📁 main.jsx
```

각 스타일 컴포넌트는 page 명칭에 맞는 pageStyle 폴더로 관리 
예) page 폴더에 page.jsx / pageStyle 폴더로 페이지에 사용된 스타일 컴포넌트를 한 곳에서 확인할 수 있도록 설계
### 📝 피드 작성, 수정 및 삭제

- 사용자가 자유롭게 게시글을 작성할 수 있으며, 게시물의 제목, 내용, 카테고리 및 이미지 업로드 할 수 있습니다.
- 작성글은 **실시간으로 피드에 반영**되며, 수정 및 삭제 가능합니다.
- **모달창**을 통해 간편하게 게시글을 수정합니다.

### ❤️ ‘좋아요’ 및 댓글 생성, 그 숫자 확인

- ‘좋아요’ 버튼을 통해 사용자는 게시글에 공감을 표현할 수 있습니다.
- 댓글을 통해 사용자 간 소통할 수 있습니다.
- 좋아요 및 댓글 수가 표시되어 **참여가 활발한 게시물**을 알 수 있습니다.

### 🗂️ 카테고리 별 피드 조회

- ‘**일상**, **운동**, **취미**, **맛집**, **기타**’ 카테고리를 제공합니다.
- 사용자가 관심있는 카테고리를 선택하여 해당 게시글만을 모아 볼 수 있습니다.

### 🧑‍💻 마이페이지

- **프로필 사진, 닉네임**을 수정할 수 있습니다.
- 내가 작성한 게시글 대시보드를 제공하여 **본인의 작성글을 관리**할 수 있습니다.

## 와이어 프레임

![image (2)](https://github.com/user-attachments/assets/ab66fd1b-c868-4f66-8d7e-dfeb43868674)

## ERD

![ERD](https://github.com/user-attachments/assets/9bb4803d-ba23-4ba0-8c70-37a51c8ba23d)

## 🛠️ 트러블 슈팅

### 🔹 새로고침 시 로그인 페이지로 리다이렉트되는 문제

#### 🚨 문제 상황  
React 프로젝트에서 로그인 상태를 관리하는 `isLogin` 변수를 사용했는데, 새로고침 시 항상 로그인 페이지로 이동하는 문제가 발생했다.  

#### 🔍 원인  
- `isLogin`의 초기값을 `false`로 설정했다.  
- React가 상태를 불러오기 전에 `isLogin`이 `false`로 평가되면서, 로그인되지 않은 것으로 간주되어 리다이렉트가 발생했다.  

#### 💡 해결 방법  
1. `isLogin`의 초기값을 `'initial'`로 변경하여 상태 확인 전까지는 로그인 여부를 확정하지 않도록 수정했다.  
2. 상태가 결정될 때까지 로딩 화면을 표시하도록 구현하여 불필요한 리다이렉트를 방지했다.  

```jsx
const [isLogin, setIsLogin] = useState('initial');

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsLogin(true);
  } else {
    setIsLogin(false);
  }
}, []);

if (isLogin === 'initial') {
  return <LoadingScreen />; // 로딩 화면 표시
}

return isLogin ? <MainPage /> : <LoginPage />;
```

#### ✅ 결과

•	새로고침 시 로그인 여부를 정확히 판단할 때까지 로그인 페이지로 이동하는 문제 해결

•	불필요한 리다이렉트 없이 자연스럽게 로그인 여부 판별

<hr>

### 🔹 로그인 후 'PGRST116' 오류 발생

#### 문제 상황
로그인 후에 users 테이블에서 정상적으로 데이터를 가져오지 못하고, 아래와 같은 **PGRST116** 오류가 발생

<img width="576" alt="스크린샷 2025-02-18 09 47 50" src="https://github.com/user-attachments/assets/aaa90f86-493a-43ce-8699-3d93982820ae" />

```
  "code": "PGRST116" // PostgREST에서 발생한 특정 오류 코드
  "details": "The result contains 0 rows" // 쿼리 실행 결과가 0개의 행을 반환했음
  "message": "JSON object requested, multiple (or no) rows returned" // JSON 객체를 요청했지만, 여러 개의 행이 반환되었거나(1개 이상) 아무 행도 반환되지 않음
```

### 🔍 원인: RLS(Row-Level Security) policy 정책이 누락됨

- 특정 테이블에 대해 `SELECT` 권한이 부여되지 않으면, 로그인 후 데이터를 조회할 때 결과가 반환되지 않음

#### 💡 해결 방법

1.	RLS 정책 설정 추가
   
•	users 테이블의 SELECT 권한을 확인하고 정책 추가

<img width="1141" alt="image" src="https://github.com/user-attachments/assets/ee287c0d-dbd7-44b7-9b5f-4440f56ff7bd" />


#### ✅ 결과

• users 테이블에서 정상적으로 데이터를 갖고 오는 것을 확인

