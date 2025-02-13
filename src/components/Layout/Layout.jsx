import { Outlet } from 'react-router-dom';
import { S } from '../../style/StLayout/Layout.style';
import Header from './Header';

const Layout = () => {
  return (
    <S.Layout>
      <Header />
      <S.Main>
        <Outlet /> {/* 각 페이지의 컨텐츠가 여기에 렌더링됨 */}
      </S.Main>
      <footer>📌 공통 푸터</footer>
    </S.Layout>
  );
};

export default Layout;
