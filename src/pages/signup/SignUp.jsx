import { useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import { supabase } from '../../supabase/client';
import S from './signupStyle/SignUp.style';
import { IconBtn } from '../../components/common/IconBtn';
import { LOGIN_PASSWORDLENGTH } from '../../constants/login';
import useInput from '../../hooks/useInput';
import USER from '../../constants/user';
import InputForAuth from '../../components/common/InputForAuth';

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
    <S.SignUpContainer>
      <S.SignUpBox>
        <S.Title>회원가입</S.Title>
        <S.Form onSubmit={handleSignup}>
          <S.FormGroup>
            <label htmlFor="nickname">닉네임</label>
            <InputForAuth
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해주세요"
              {...inputNickname}
              minLength={USER.MIN_NICKNAME_LENGTH}
              maxLength={USER.MAX_NICKNAME_LENGTH}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="email">이메일</label>
            <InputForAuth
              type="email"
              placeholder="이메일을 입력해주세요"
              id="email"
              {...inputEmail}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="password">비밀번호</label>
            <InputForAuth
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              id="password"
              {...inputPwd}
              minLength={LOGIN_PASSWORDLENGTH.MIN_PASSWORD_LENGTH}
              maxLength={LOGIN_PASSWORDLENGTH.MAX_PASSWORD_LENGTH}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="confirmPwd">비밀번호 확인</label>
            <InputForAuth
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              id="confirmPwd"
              minLength={LOGIN_PASSWORDLENGTH.MIN_PASSWORD_LENGTH}
              maxLength={LOGIN_PASSWORDLENGTH.MAX_PASSWORD_LENGTH}
              {...inputConfirmPwd}
            />
          </S.FormGroup>
          <IconBtn type="submit">
            <S.SignUpText>회원가입 하기</S.SignUpText>
            <FiUserPlus size={20} color={'#666'} />
          </IconBtn>
        </S.Form>
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUp;
