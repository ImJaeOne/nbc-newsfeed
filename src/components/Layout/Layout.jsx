import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import styled from 'styled-components';

const S_Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const S_Main = styled.main`
  flex: 1;
  padding: 20px;
  margin: 0 10%;
  width: 80%;
`;

const Layout = () => {
  return (
    <S_Layout>
      <Nav />
      <S_Main>
        <Outlet /> {/* 각 페이지의 컨텐츠가 여기에 렌더링됨 */}
      </S_Main>
      <footer>📌 공통 푸터</footer>
    </S_Layout>
  );
};

export default Layout;
