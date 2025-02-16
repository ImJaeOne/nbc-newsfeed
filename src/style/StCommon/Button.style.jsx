import styled from 'styled-components';

const S = {};

export const IconsButtons = ({ props, children }) => {
  return <S.IconButton {...props}>{children}</S.IconButton>;
};

S.IconButton = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border: none;
`;
