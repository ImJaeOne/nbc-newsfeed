import S from './homeStyle/CategoryButtons.style';
const categories = ['전체', '취미', '일상', '운동', '기타', '맛집'];

const CategoryButtons = ({ selectedCategory, setSelectedCategory }) => {
  const handleClickCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <S.ButtonContainer>
      {categories.map((category) => (
        <S.CategoryButton
          key={category}
          $isSelected={category === selectedCategory}
          $category={category}
          onClick={() => handleClickCategory(category)}
        >
          {category}
        </S.CategoryButton>
      ))}
    </S.ButtonContainer>
  );
};

export default CategoryButtons;
