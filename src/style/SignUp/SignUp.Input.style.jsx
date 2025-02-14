import styled from 'styled-components';

const S = {};

S.FormContainer = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vh;
  height: 100vh;
`;

S.SignUpInput = styled.input`
  border: 1px solid #f3c301;
  padding: 10px;
  font-size: 30px;
  width: 300px;
`;

export default S;
