import { Outlet } from 'react-router-dom';
import { S } from '../../style/StLayout/Layout.style';
import Header from './Header';
import FloatBtn from './FloatBtn';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Layout = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <S.Layout>
      <Header />
      <S.Main>
        <Outlet /> {/* 각 페이지의 컨텐츠가 여기에 렌더링됨 */}
      </S.Main>
      {isLogin && <FloatBtn />}
      <footer>📌 공통 푸터</footer>
    </S.Layout>
  );
};

export default Layout;
