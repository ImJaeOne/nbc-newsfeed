import S from '../style/SignUp/SignUp.Input.style';

const InputForSignup = ({
  placeholder,
  onSubmit,
  type,
  value,
  onChange,
  id,
  name,
}) => {
  return (
    <div>
      <S.FormContainer onSubmit={onSubmit}>
        <S.SignUpInput
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          id={id}
        />
      </S.FormContainer>
    </div>
  );
};

export default InputForSignup;
