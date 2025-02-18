import { useContext } from 'react';
import S from './layoutStyle/Header.style';
import { LOGIN_STATUS } from '../../constants/login';
import { supabase } from '../../supabase/client';
import { AuthContext } from '../../contexts/AuthProvider';

const Nav = () => {
  const { isLogin, user } = useContext(AuthContext);

  function handleLogout() {
    supabase.auth.signOut();
  }
  return (
    <S.NavContainer>
      {isLogin === LOGIN_STATUS.LOGGED_IN && (
        <S.UserMenu>
          <S.UserName to="/mypage">{user.nickname}</S.UserName>
          <S.Logoutbtn onClick={handleLogout}>로그아웃</S.Logoutbtn>
        </S.UserMenu>
      )}{' '}
      {isLogin === LOGIN_STATUS.LOGGED_OUT && (
        <S.LinksWrapper>
          <S.AuthLink to="/login">로그인</S.AuthLink>
          <S.AuthLink to="/signup">회원가입</S.AuthLink>
        </S.LinksWrapper>
      )}
    </S.NavContainer>
  );
};

export default Nav;
