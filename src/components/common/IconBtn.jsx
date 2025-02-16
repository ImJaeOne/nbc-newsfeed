import styled from 'styled-components';

const S = {};

export const IconBtn = ({ children, ...props }) => {
  return <S.IconButton {...props}>{children}</S.IconButton>;
};

S.IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
