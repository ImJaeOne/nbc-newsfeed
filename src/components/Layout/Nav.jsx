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
    <S.Nav>
      {isLogin ? (
        <S.UserMenu>
          <S.UserName to="/mypage">{user.nickname}</S.UserName>
          <S.Logoutbtn onClick={handleLogout}>로그아웃</S.Logoutbtn>
        </S.UserMenu>
      ) : (
        <S.AuthLinks>
          <S.Link to="/login">로그인</S.Link>
          <S.Link to="/signup">회원가입</S.Link>
        </S.AuthLinks>
      )}
    </S.Nav>
  );
};

export default Nav;
