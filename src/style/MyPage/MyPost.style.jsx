import styled from 'styled-components';

const S = {};

S.PostCardContainer = styled.div`
  width: 200px;
  height: 260px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: #ccc;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 210px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 168px;
  }
`;

S.ProfileWrapper = styled.div`
  width: 100%;
  height: 65%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-bottom: dashed 1px #999;
`;

S.ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

S.ProfileAlt = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  color: #ffffff;
  font-size: 14px;
`;

S.LinkToDetail = styled.div`
  text-decoration: none;
  color: #333;
`;

S.MyPostWrapper = styled.div`
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.PostTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

S.LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
`;

S.IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
`;

S.PostDate = styled.div`
  font-size: 14px;
  color: #888;
`;

export default S;
