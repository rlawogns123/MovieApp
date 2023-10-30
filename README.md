# MovieApp

## 기술 스택

<div>
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

</div>

<br/>
<br/>

## 프로젝트 목표

<br/>

<h3>TMDB API를 사용하여 영화 정보 사이트 배포</h3>
<h3>회원가입, 로그인 / 로그아웃 기능 구현</h3>
<h3>영화 상세 페이지 댓글 등록, 삭제 기능 구현</h3>

<br/>
<br/>

## 실행

https://port-0-movieapp-12fhqa2blnajx18z.sel5.cloudtype.app/

<br/>
<br/>

## 실행 화면

### 홈화면

![Home](https://github.com/rlawogns123/MovieApp/assets/73879034/8dd73183-478c-41bb-91cc-23e086fcb0b3)

- React Query의 useQuery를 사용해 TMDB API 데이터를 받아와 상위 5개 영화 정보 표시
- 우측 더 보기 버튼을 클릭하거나 헤더의 카테고리 클릭 시 전체 영화 목록 표시
- windows 객체를 사용해 scroll up 버튼 구현
- React Query의 useInfiniteQuery와 react-infinite-scroller를 사용해 무한 스크롤 기능 구현

<br/>
<br/>

### 회원가입, 로그인

![Signin](https://github.com/rlawogns123/MovieApp/assets/73879034/93dba030-c98a-4954-94dc-9b4bdfaebc60)

- bcrypt를 사용해 비밀번호를 암호화하여 MongoDB에 회원 정보를 저장
- 로그인 시 JWT를 사용해 토큰을 만들고 쿠키에 저장
- 로그아웃 시 ID에 해당하는 토큰 삭제

<br/>
<br/>

### 검색 페이지

![Search](https://github.com/rlawogns123/MovieApp/assets/73879034/5d08897d-0ead-4378-a25c-a2ba9c222aaa)

- TMDB의 검색 API를 사용해 검색 단어가 영화 제목에 포함된 영화 목록 표시

<br/>
<br/>

### 영화 상세 페이지

![Detail](https://github.com/rlawogns123/MovieApp/assets/73879034/7faa35e6-47c1-4510-b9b7-855576736d86)

- 영화 제목, 원제, 평점, 줄거리와 등장인물을 표시
- 트레일러가 제공되는 경우 트레일러 보기 버튼 활성화 후 클릭 시 유튜브 트레일러 재생
- 쿠키에 토큰이 존재하는 경우 댓글 등록 기능 활성화
- 댓글 등록 시 저장된 유저 정보와 현재 로그인한 유저 정보를 비교해서 같을 경우 댓글 삭제 버튼 활성화

## 문제 해결

### CORS 에러

브라우저를 통해 통신을 할 때 URL 내 Protocol과 Host, Port번호가 다를 경우 발생하는 에러

-> http-proxy-middleware의 createProxyMiddleware를 사용해 해결

### useParams() 타입 에러

영화 검색 페이지에서 파라미터로 검색어를 넘겨줄 때 searchWord의 타입 에러

-> 타입 표명(Type Assertion)을 사용해 해결

-> const { searchWord } = useParams() as { searchWord: string };

### 배포 에러

클라우드타입으로 배포를 하는데 배포 준비중이라는 명확하지 않은 에러 발생

-> 클라우드타입은 TypeScript를 지원하지 않아 서버 코드를 TypeScript에서 JavaScript로 바꾸어서 해결

-> Vite에서 빌드 결과물이 저장되는 기본 디렉터리가 dist인데 디렉터리 이름을 build로 바꾸니 정상적으로 배포
