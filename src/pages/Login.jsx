import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabase/client';
import InputForAuth from '../components/InputForAuth';
import { LOGIN } from '../constants/login';
import { MdLogin } from 'react-icons/md';
import { IconBtn } from '../components/common/IconBtn';

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

    // 이메일 유효성 검사
    if (!isValidEmail(inputEmail)) {
      alert('유효한 이메일을 입력해 주세요.');
      return;
    }

    // 공백 포함 및 미입력 검사
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
    <div>
      <h2>로그인</h2>
      <form style={{ display: 'flex' }} onSubmit={submitHandler}>
        <InputForAuth
          type="email"
          placeholder="이메일"
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
          value={inputEmail}
        />
        <InputForAuth
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          minLength={LOGIN.MIN_PASSWORD_LENGTH}
          maxLength={LOGIN.MAX_PASSWORD_LENGTH}
        />
        <IconBtn>
          <MdLogin size={40} color={'red'} />
        </IconBtn>
      </form>
      <span>
        아직 계정이 없으신가요? <Link to="/signup">회원가입 하러가기</Link>
      </span>
    </div>
  );
};

export default Login;
