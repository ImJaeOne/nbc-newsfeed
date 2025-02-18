import styled from 'styled-components';

const S = {};

S.CardContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    transform 0.3s;

  &:hover {
    border-color: #b8b8b8;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

S.CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
`;

S.CardProfile = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: #3f3f3f;
  font-size: 14px;
`;

S.CardTitle = styled.div`
  margin: 10px 0;
  max-width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: #333;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
`;

S.CardImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f7f7f7;
`;

S.CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

S.CardImgSkeleton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  color: #ffffff;
  border-radius: 8px;
  font-size: 14px;
`;

S.CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 14px;
  padding-top: 8px;
`;

S.CardIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: #555;
`;

S.LenSpan = styled.span`
  margin-left: 5px;
  font-size: 16px;
`;

export default S;
