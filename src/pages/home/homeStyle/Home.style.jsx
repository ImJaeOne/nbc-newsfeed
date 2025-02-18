import styled from 'styled-components';

const S = {};

S.HomeContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  justify-content: center;
  gap: 20px 20px;
  background-color: #fffbf0;
`;

export default S;
