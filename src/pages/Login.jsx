import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    // 이메일 주소 유효 여부 판단 - 정규 표현식 활용
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmedInputEmail = inputEmail.trim();
    const trimmedPassword = password.trim();

    if (!trimmedInputEmail || !trimmedPassword) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (!isValidEmail(trimmedInputEmail)) {
      alert('유효한 이메일을 입력해 주세요.');
      return;
    }

    // 회원가입 조건에 따라 추후 변경 예정
    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상 입력해야 합니다.');
    }

    // 임시 - 추후 홈 컴포넌트로 리다이렉트 예정
    // useNavigate
    alert('로그인 성공!');
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
          value={inputEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button type="submit">로그인</button>
      </form>
      <span>
        아직 계정이 없으신가요? <Link to="/signup">회원가입 하러가기</Link>
      </span>
    </div>
  );
};

export default Login;
