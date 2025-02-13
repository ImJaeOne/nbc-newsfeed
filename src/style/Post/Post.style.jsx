import styled from 'styled-components';

const S = {};

S.FormContainer = styled.form`
  width: 1100px;
  border: 1px solid;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 20px;
`;

S.PostSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
`;

S.PostInput = styled.input`
  width: ${(props) => (props.name === 'postTitle' ? '500px' : '640px')};
`;

S.FileLabel = styled.label`
  width: 570px;
  border: 1px solid;
  height: 21px;
  background-color: white;
`;

S.PostLabel = styled.label`
  margin-right: 45px;
`;

S.PostSubmitButton = styled.button`
  margin: 0 auto;
  width: 100px;
  height: 40px;
  font-size: 30px;
  border-radius: 8px;
`;

export default S;
