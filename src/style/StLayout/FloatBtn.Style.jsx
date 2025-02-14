import styled, { css } from 'styled-components';

export const S = {};

S.FloatBtnContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

S.FloatMainBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.haeder_text_color};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #f25151;
  }
`;

S.DropdownMenuWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: none;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    `}
`;

S.IconButton = styled.button`
  background-color: #f2c450;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;

  font-size: 20px;
  &:hover {
    background-color: #27ae60;
  }
`;
