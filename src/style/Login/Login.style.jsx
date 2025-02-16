import styled from 'styled-components';

export const S = {};

S.LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
  height: 100%;
  background-color: #fffbf0;
`;

S.LoginBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

S.FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    color: #333;
  }
`;

S.SignupText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;

  a {
    color: ${({ theme }) => theme.colors.haeder_text_color};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
