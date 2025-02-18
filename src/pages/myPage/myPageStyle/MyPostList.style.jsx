import styled from 'styled-components';

const S = {};

S.MyPostListContainer = styled.div`
  width: 100%;
  margin: 10px auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 20px;
  justify-content: center;
`;

S.PostListDashboard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 80px;
  margin-top: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  }
`;

S.MoreText = styled.p`
  color: #666;
  font-size: 15px;
`;

export default S;
