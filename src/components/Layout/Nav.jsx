import { useState } from 'react';
import { S } from '../../style/StLayout/Header.style';

const Nav = () => {
  const [isLogin, setIsLogin] = useState('false');
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
      <button
        onClick={() => {
          setIsLogin(!isLogin);
        }}
      >
        버튼
      </button>
    </S.Nav>
  );
};

export default Nav;
