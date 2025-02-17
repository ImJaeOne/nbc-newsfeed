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
`;

S.ImageField = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  margin-left: 10px;
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
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  min-height: 60px;
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

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }

  &::-webkit-scrollbar-track {
    background-color: gray;
  }
`;

export default S;
