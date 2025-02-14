import { useContext } from 'react';
import { S } from '../../style/StLayout/Header.style';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';

const Nav = () => {
  const { isLogin, user } = useContext(AuthContext);

  function handleLogout() {
    supabase.auth.signOut();
  }

  return (
    <S.NavContainer>
      {isLogin ? (
        <S.UserMenu>
          <S.UserName to="/mypage">{user.nickname}</S.UserName>
          <S.Logoutbtn onClick={handleLogout}>로그아웃</S.Logoutbtn>
        </S.UserMenu>
      ) : (
        <S.LinksWrapper>
          <S.AuthLink to="/login">로그인</S.AuthLink>
          <S.AuthLink to="/signup">회원가입</S.AuthLink>
        </S.LinksWrapper>
      )}
    </S.NavContainer>
  );
};

export default Nav;
