import { useState } from 'react';

const SignUp = () => {
  const [userNickname, setUserNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const handleLogin = () => {};

  return (
    <div>
      <div>회원가입</div>
      <form onSubmit={handleLogin}>
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
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />{' '}
        <br />
        비밀번호:{' '}
        <input
          type="text"
          name="pwd"
          id="pwd"
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
        />{' '}
        <br />
        <button onSubmit={handleLogin}>확인</button>
      </form>
    </div>
  );
};

export default SignUp;
