import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>로그인</h2>
      <form>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
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
