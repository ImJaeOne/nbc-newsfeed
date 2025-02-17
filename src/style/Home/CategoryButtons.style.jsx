import styled from 'styled-components';

const S = {};

S.ButtonContainer = styled.div`
  position: fixed;
  left: -20px;
  top: 25%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

S.CategoryButton = styled.button`
  background: ${({ isSelected, category }) =>
    isSelected
      ? `linear-gradient(to right, rgba(${getRGBA(getCategoryColor(category), 0.5)}) 50%, ${getCategoryColor(category)} 50%)`
      : getCategoryColor(category)};
  color: #333;
  font-weight: bold;
  font-size: 20px;
  border: none;
  padding: 10px 15px;
  padding-left: ${({ isSelected }) => (isSelected ? '70px' : '40px')};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '5px 5px 8px rgba(0, 0, 0, 0.3)'
      : '3px 3px 5px rgba(0, 0, 0, 0.2)'};
  transform: ${({ isSelected }) =>
    isSelected ? 'translateX(10px) rotate(-2deg)' : 'rotate(2deg)'};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ isSelected, category }) =>
      isSelected
        ? `linear-gradient(to right, rgba(${getRGBA(getCategoryColor(category), 0.5)}) 50%, ${getCategoryColor(category)} 50%)`
        : getCategoryColor(category)};
    transform: ${({ isSelected }) =>
      isSelected ? 'translateX(10px) rotate(0deg)' : 'rotate(0deg)'};
  }
`;

const getCategoryColor = (category) => {
  switch (category) {
    case '전체':
      return '#ffeb3b';
    case '일상':
      return '#efb2d6';
    case '운동':
      return '#ea9d00';
    case '취미':
      return '#fdecd4';
    case '맛집':
      return '#adcacb';
    case '기타':
      return '#87c159';
    default:
      return '#a86d83';
  }
};

const getRGBA = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}, ${alpha}`;
};

export default S;
