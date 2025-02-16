import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpInput from '../components/SignUp/SignUpInput';
import useInput from '../hooks/useInput';
import { LOGIN } from '../constants/login';
const SignUp = () => {
  const inputEmail = useInput('');
  const inputNickname = useInput('');
  const inputPwd = useInput('');
  const inputConfirmPwd = useInput('');

  const navigate = useNavigate();

  // form 제출 시 Supabase를 통해 회원가입을 하는 함수
  const handleSignup = async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPwd.value;
    const confirmPwd = inputConfirmPwd.value;

    const isValidUsername = (username) => {
      const usernameRegex = /^[a-zA-Z0-9가-힣_]{1,16}$/;
      return usernameRegex.test(username);
    };

    // 패스워드 유효성 검사
    if (password !== confirmPwd) {
      alert('비밀번호를 다시 확인해주세요!');
      return;
    }

    if (password.length < LOGIN.MIN_PASSWORD_LENGTH) {
      alert(
        `비밀번호는 최소 ${LOGIN.MIN_PASSWORD_LENGTH}자 이상 입력해야 합니다.`,
      );
      return;
    }
    if (password.length > LOGIN.MAX_PASSWORD_LENGTH) {
      alert(
        `비밀번호는 최대 ${LOGIN.MAX_PASSWORD_LENGTH}자 이하 입력해야 합니다.`,
      );
      return;
    }
    if (/\s/.test(password) || /\s/.test(email)) {
      alert('공백을 포함할 수 없습니다.');
      return;
    }

    //  닉네임 유효성 검사
    if (!isValidUsername(inputNickname.value)) {
      alert('닉네임은 1~16자의 한글, 영어, 숫자, 언더스코어(_)만 허용됩니다.');
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
        user_nickname: inputNickname.value,
        user_email: email,
      });

      if (userError) throw userError;

      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      alert(error.message);
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <StWrapper>
      <StSignupContainer>
        <StTitle>회원가입</StTitle>
        <StForm onSubmit={handleSignup}>
          <SignUpInput
            type="text"
            name="닉네임"
            id="nickname"
            {...inputNickname}
          />
          <SignUpInput type="email" name="이메일" id="email" {...inputEmail} />
          <SignUpInput type="password" name="비밀번호" id="pwd" {...inputPwd} />
          <SignUpInput
            type="password"
            name="비밀번호확인"
            id="confirmPwd"
            minLength={LOGIN.MIN_PASSWORD_LENGTH}
            maxLength={LOGIN.MAX_PASSWORD_LENGTH}
            {...inputConfirmPwd}
          />
          <StSubmitBtn type="submit">확인</StSubmitBtn>
        </StForm>
      </StSignupContainer>
    </StWrapper>
  );
};

const StTitle = styled.h2`
  font-size: 40px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StSubmitBtn = styled.button`
  border: none;
  width: 100px;
  height: 50px;
  font-size: 25px;
  border-radius: 30px;
  cursor: pointer;
  display: block;
  transition: all, 0.2s;

  &:hover {
    scale: 1.05;
  }
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

const StSignupContainer = styled.div`
  width: 70%;
  padding: 20px 0;
  background-color: #fffefa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid #ddd;
`;

export default SignUp;
