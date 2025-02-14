import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import InputForAuth from '../components/InputForAuth';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  // form 제출 시 Supabase를 통해 회원가입을 하는 함수
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호를 다시 확인해주세요!');
      return;
    }
    try {
      // Supabase auth를 통해 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 회원가입 성공 시, users 테이블에 닉네임 저장
      const { error: userError } = await supabase.from('users').insert({
        user_num: authData.user.id,
        user_nickname: nickname,
      });

      if (userError) throw userError;

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
        닉네임:
        <InputForAuth
          type="text"
          name="nickname"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <br />
        이메일:
        <InputForAuth
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        비밀번호:
        <InputForAuth
          type="password"
          name="pwd"
          id="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        비밀번호 확인:
        <InputForAuth
          type="password"
          name="confirmPwd"
          id="confirmPwd"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button>확인</button>
      </form>
    </div>
  );
};

export default SignUp;
