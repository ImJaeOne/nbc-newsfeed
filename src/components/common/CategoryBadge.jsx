import styled from 'styled-components';

const S = {};

export const CategoryBadge = ({ category, ...props }) => {
  const backgroundColor = getCategoryColor(category);
  return (
    <S.CategoryBadge backgroundColor={backgroundColor} {...props}>
      {category}
    </S.CategoryBadge>
  );
};

S.CategoryBadge = styled.span`
  background-color: ${(props) => props.backgroundColor};
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  margin-right: 5px;
  box-sizing: border-box;
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
