import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabase/client';
import InputForAuth from '../components/InputForAuth';
import { LOGIN } from '../constants/login';
import { IconsButtons } from '../style/StCommon/Button.Style';
import { MdLogin } from 'react-icons/md';
import { S } from '../style/Login/Login.style';

const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValidEmail(inputEmail)) {
      alert('유효한 이메일을 입력해 주세요.');
      return;
    }

    if (/\s/.test(password) || /\s/.test(inputEmail)) {
      alert('공백을 포함할 수 없습니다.');
      return;
    }

    try {
      const result = await supabase.auth.signInWithPassword({
        email: inputEmail,
        password: password,
      });
      if (result.error) {
        alert(`로그인 실패: ${result.error.message}`);
        return;
      } else {
        alert('로그인 성공!');
        navigate('/');
      }
    } catch (err) {
      console.error(err.message);
      alert('로그인 실패 - 외부 에러 발생');
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginBox>
        <h2>로그인</h2>
        <S.Form onSubmit={submitHandler}>
          <S.FormGroup>
            <label htmlFor="email">이메일</label>
            <InputForAuth
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              onChange={(e) => setInputEmail(e.target.value)}
              value={inputEmail}
            />
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="password">비밀번호</label>
            <InputForAuth
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              minLength={LOGIN.MIN_PASSWORD_LENGTH}
              maxLength={LOGIN.MAX_PASSWORD_LENGTH}
            />
          </S.FormGroup>

          <IconsButtons type="submit">
            <MdLogin size={40} color={'red'} />
          </IconsButtons>
        </S.Form>

        <S.SignupText>
          아직 계정이 없으신가요? <Link to="/signup">회원가입 하러가기</Link>
        </S.SignupText>
      </S.LoginBox>
    </S.LoginContainer>
  );
};

export default Login;
