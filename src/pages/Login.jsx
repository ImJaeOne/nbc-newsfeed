import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabase/client';

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

    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상 입력해야 합니다.');
    }

    try {
      const result = await supabase.auth.signInWithPassword({
        email: trimmedInputEmail,
        password: trimmedPassword,
      });
      if (result.error) {
        alert(`로그인 실패: ${result.error.message}`);
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
