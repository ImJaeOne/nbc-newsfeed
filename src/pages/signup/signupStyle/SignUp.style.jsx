import styled from 'styled-components';

const S = {};

S.Title = styled.h2`
  display: inline-block;
  font-size: 30px;
  margin-bottom: 10px;
`;

S.SignUpText = styled.p`
  margin-right: 5px;
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
    font-size: 1.3rem;
    margin-bottom: 5px;
    color: #333;
  }
`;

S.SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  height: 100%;
  background-color: #fffbf0;
`;

S.SignUpBox = styled.div`
  background-color: white;
  width: 350px;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export default S;
