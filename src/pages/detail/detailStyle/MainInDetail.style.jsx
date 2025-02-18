import styled from 'styled-components';
import { theme } from '../../../style/theme';

const S = {};

S.UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
  gap: 5px;
  margin-bottom: 5px;
`;

S.ImageField = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  box-sizing: border-box;
`;

S.MainContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  box-sizing: border-box;
`;

S.PhotoBox = styled.div`
  width: 50%;
  max-height: 534px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
  }
`;

S.ContentBox = styled.div`
  display: flex;
  width: 50%;
  min-height: 100%;
  max-height: 534px;
  box-sizing: border-box;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
`;

S.PostContent = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  min-height: 70px;
  display: flex;
  justify-content: space-between;
`;

S.CommentBox = styled.div`
  background-color: #f3f3f3;
  border-radius: 30px;
  padding: 15px;
  margin-top: auto;
  box-sizing: border-box;
  display: flex;
`;

S.CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 15px 0;

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }

  &::-webkit-scrollbar-track {
    background-color: gray;
  }
`;

S.CommentField = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

S.CommentUserInfo = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
  align-items: center;
`;

S.CommentContentField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 80%;
  max-height: 100px;
`;

S.DetailMainUserWrapper = styled.div``;

S.CommentDeleteBtn = styled.button`
  cursor: pointer;
  padding: 5px;
  width: 40px;
  height: 25px;
  border: none;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 0 1px rgb(0, 0, 0, 0.1);
`;

export default S;
