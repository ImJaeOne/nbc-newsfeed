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
        <Outlet />
      </S.Main>
      {isLogin && <FloatBtn />}
      <footer>📌 공통 푸터</footer>
    </S.Layout>
  );
};

export default Layout;
