import { Link } from 'react-router-dom';
import styled from 'styled-components';

const S = {};

S.PostCardContainer = styled.div`
  width: 200px;
  height: 260px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

S.ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

S.ProfileAlt = styled.div`
  color: #bfbfbf;
`;

S.LinkToDetail = styled(Link)`
  text-decoration: none;
  color: black;
`;

S.MyPostWrapper = styled.div`
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.PostTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

S.PostDate = styled.div`
  font-size: 14px;
  color: #666;
  position: absolute;
  right: 0;
`;

S.LikeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;

S.IconWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
`;

export default S;
