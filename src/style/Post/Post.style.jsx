import styled from 'styled-components';

const S = {};

S.FormContainer = styled.form`
  width: 100%;
  background-color: antiquewhite;
  display: flex;
  margin: 0 auto;
  gap: 75px;
  padding: 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 35px;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    gap: 50px;
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 15px;
  }
`;

S.CommonSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: ${(props) =>
    props.$section === 'fileSection' ? 'center' : 'normal'};

  @media (max-width: 1024px) {
    align-items: center;
  }

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 15px;
  }
`;

S.CategoryWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

S.PostPart = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: ${(props) => (props.$type === 'category' ? 'column' : 'row')};
  justify-content: flex-start;

  @media (max-width: 1024px) {
    align-items: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    align-items: center;
  }
`;

S.PostInput = styled.input`
  border: 1px solid #f3c301;
  border-radius: 30px;
  padding: 10px;
  font-size: 20px;
  width: 300px;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 80%;
    font-size: 16px;
  }
`;

S.PostTextArea = styled.textarea`
  border: 1px solid #f3c301;
  border-radius: 30px;
  padding: 10px;
  font-size: 20px;
  width: 300px;
  height: 200px;
  padding: 10px;
  scrollbar-width: none;
  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 80%;
    height: 120px;
    font-size: 16px;
  }
`;

S.FileLabel = styled.label`
  width: 240px;
  display: flex;
  border: 1px solid #f3c301;
  height: 315px;
  background-color: white;
  font-size: 15px;
  justify-content: center;
  border-radius: 30px;

  @media (max-width: 480px) {
    width: 60%;
    height: 20vh;
    font-size: 12px;
  }
`;

S.PostLabel = styled.label`
  display: flex;
  gap: 15px;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }

  @media (max-width: 480px) {
    align-items: center;
  }
`;

S.PostSubmitButton = styled.button`
  border: 1px solid #f3c301;
  border-radius: 30px;
  padding: 10px;
  font-size: 20px;
  width: 322px;
  padding: 10px;

  @media (max-width: 480px) {
    width: 70px;
    height: 30px;
    font-size: 20px;
  }
`;

export default S;
