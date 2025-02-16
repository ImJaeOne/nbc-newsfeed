import styled from 'styled-components';
import { Link } from 'react-router-dom';

const S = {};

S.CardContainer = styled(Link)`
  width: 300px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fee3a2;
  border: 1px solid #d2a679;
  border-radius: 5px;
  transition:
    border 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    border: 1px solid #b88650;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }
`;

S.CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.CardProfile = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #ce9b68;
`;

S.CardTitle = styled.div`
  margin: 5px 10px;
  max-width: 100%;
  height: 20px;
  overflow: hidden;
  font-weight: bolder;
  font-size: larger;
  color: #333;
`;

S.CardImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  overflow: hidden;
`;

S.CardImg = styled.img`
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

S.CardImgSkeleton = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffda85;
  background-size: 400% 100%;
  color: ${({ theme }) => theme.colors.haeder_text_color};
  border-radius: 5px;
`;

S.CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
`;

S.CardIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #333;
`;

S.LenSpan = styled.span`
  margin-left: 5px;
  font-size: 20px;
`;

export default S;
