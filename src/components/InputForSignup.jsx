import S from '../style/SignUp/SignUp.Input.style';

const InputForSignup = ({ type, value, onChange }) => {
  return <S.SignUpInput type={type} value={value} onChange={onChange} />;
};

export default InputForSignup;
