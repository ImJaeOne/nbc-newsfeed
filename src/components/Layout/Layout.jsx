import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import { S } from '../../style/StLayout/Layout.style';

const Layout = () => {
  return (
    <S.Layout>
      <Nav />
      <S.Main>
        <Outlet /> {/* 각 페이지의 컨텐츠가 여기에 렌더링됨 */}
      </S.Main>
      <footer>📌 공통 푸터</footer>
    </S.Layout>
  );
};

export default Layout;
