import styled from 'styled-components';

const S = {};

S.MyPostListContainer = styled.div`
  width: 100%;
  background-color: #fee3a2;
  border-radius: 30px;
  margin: 10px auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px 10px;
  gap: 30px;
`;

S.PostListDashboard = styled.div`
  background-color: #fee3a2;
  border-radius: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 80px;
  margin-top: 20px;
`;

S.MoreText = styled.p`
  color: #666;
  font-size: 15px;
`;

export default S;
