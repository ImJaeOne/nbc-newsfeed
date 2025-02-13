import styled from 'styled-components';

export const S = {};

S.Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.body_background_color};
`;

S.Main = styled.main`
  flex: 1;
  padding: 20px;
  margin: 0 10%;
  margin-top: 150px;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;
