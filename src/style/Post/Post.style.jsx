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
  padding-top: 20px;
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
  transform: ${(props) =>
    props.name === 'postTitle' ? 'translateX(-45px)' : ''};
`;

S.FileLabel = styled.label`
  width: 570px;
  display: flex;
  border: 1px solid;
  height: 21px;
  background-color: white;
  font-size: 15px;
  align-items: center;
`;

S.PostLabel = styled.label`
  display: flex;
  flex-direction: row;
  gap: 55px;
`;

S.PostSubmitButton = styled.button`
  margin: 0 auto;
  width: 100px;
  height: 40px;
  font-size: 30px;
  border-radius: 8px;
`;

export default S;
