import styled from 'styled-components';
import { theme } from '../theme';

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

export default S;
