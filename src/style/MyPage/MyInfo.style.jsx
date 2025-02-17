import styled from 'styled-components';

const S = {};

S.ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.MyInfoDashboard = styled.div`
  padding: 20px 0;
  background-color: #fee3a2;
  border-radius: 30px;
  display: flex;
  position: relative;
  align-items: flex-start;
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
