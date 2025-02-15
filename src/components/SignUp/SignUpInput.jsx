import styled from 'styled-components';
import InputForAuth from '../InputForAuth';

const SignUpInput = (props) => {
  return (
    <StInputWrapper>
      <StInputText>{props.name} : </StInputText>
      <InputForAuth {...props} />
    </StInputWrapper>
  );
};

const StInputWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StInputText = styled.p`
  width: 170px;
  text-align: right;
  font-size: 35px;
  margin-right: 20px;
`;

export default SignUpInput;
