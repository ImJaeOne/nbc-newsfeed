import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userNickname, setUserNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // form 제출 시 Supabase를 통해 회원가입을 하는 함수
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signUp({
        email,
        password,
      });
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
      console.error('회원가입 오류:', error);
    }
  };
  return (
    <div>
      <div>회원가입</div>
      <form onSubmit={handleSignup}>
        닉네임:{' '}
        <input
          type="text"
          name="nickname"
          id="nickname"
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
        />{' '}
        <br />
        이메일:{' '}
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{' '}
        <br />
        비밀번호:{' '}
        <input
          type="text"
          name="pwd"
          id="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{' '}
        <br />
        <button>확인</button>
      </form>
    </div>
  );
};

export default SignUp;
