import styled from 'styled-components';

const S = {};

S.ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.MyInfoDashboard = styled.div`
  padding: 20px 30px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  position: relative;
  align-items: flex-start;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  }
`;

S.TextInfoWrapper = styled.div`
  margin-left: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

S.MyNickname = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

S.MyIntro = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

S.NicknameInput = styled.input`
  width: 300px;
  font-size: 25px;
  padding: 8px 12px;
  border: 2px solid #f9d077;
  border-radius: 8px;
  outline: none;
`;

S.IntroInput = styled.textarea`
  width: 300px;
  height: 80px;
  font-size: 20px;
  padding: 8px 12px;
  border: 2px solid #f9d077;
  border-radius: 8px;
  outline: none;
  resize: none;
`;

S.FileInput = styled.input`
  display: none;
`;

S.FileLabel = styled.label`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f9d077;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #fabc3c;
  }
`;

S.EditBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #f9d077;
  color: #fff;
  font-size: 25px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #fabc3c;
  }
`;

export default S;
