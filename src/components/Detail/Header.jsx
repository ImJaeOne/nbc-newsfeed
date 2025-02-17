import { IoIosMore } from 'react-icons/io';
import { CategoryBadge } from '../common/CategoryBadge';

import S from '../../style/Detail/HeaderInDetail.style';

const Header = ({ post }) => {
  const { title, category } = post;

  return (
    <S.HeaderInDetail>
      <S.TitleContainer>
        <CategoryBadge category={category} />
        {title}
      </S.TitleContainer>
      <IoIosMore />
    </S.HeaderInDetail>
  );
};

export default Header;
