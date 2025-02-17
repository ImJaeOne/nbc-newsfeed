import { Outlet } from 'react-router-dom';
import { S } from '../../style/StLayout/Layout.style';
import Header from './Header';
import FloatBtn from './FloatBtn';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { LOGIN_STATUS } from '../../constants/login';
import Footer from './Footer';

const Layout = () => {
  const { isLogin } = useContext(AuthContext);
  const FloatBtnStatus = isLogin === LOGIN_STATUS.LOGGED_IN ? true : false;

  return (
    <S.Layout>
      <Header />
      <S.Main>
        <Outlet />
      </S.Main>
      {FloatBtnStatus && <FloatBtn />}
      <Footer />
    </S.Layout>
  );
};

export default Layout;
