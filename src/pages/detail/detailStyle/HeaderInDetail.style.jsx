import styled from 'styled-components';

const S = {};

S.DetailContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.nav_background_color};
  border-radius: 30px;
  box-sizing: border-box;
`;

S.HeaderInDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 20px 20px;
  color: #424242;
  border-radius: 5px;
  margin-bottom: 0px;
  box-sizing: border-box;
`;

S.TitleContainer = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

export default S;
