import { useContext } from 'react';
import { S } from '../../style/StLayout/Header.style';
import { AuthContext } from '../../contexts/AuthProvider';

const Nav = () => {
  const { isLogin, user } = useContext(AuthContext);

  console.log(user);
  return (
    <S.Nav>
      {isLogin ? (
        <S.UserMenu>
          <S.UserName to="/mypage">{user.nickname}</S.UserName>
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
