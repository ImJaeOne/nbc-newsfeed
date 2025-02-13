import { useContext, useEffect } from 'react';
import { S } from '../../style/StLayout/Header.style';
import { AuthContext } from '../../contexts/AuthProvider';

const Nav = () => {
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session.user);
    };
    getSession();
  }, []);
  return (
    <S.Nav>
      {isLogin ? (
        <S.UserMenu>
          <S.UserName to="/mypage">사용자님</S.UserName>
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
