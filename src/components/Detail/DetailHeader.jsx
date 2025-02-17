import { CategoryBadge } from '../common/CategoryBadge';

import S from '../../style/Detail/HeaderInDetail.style';

const DetailHeader = ({ post }) => {
  const { title, category } = post;

  return (
    <S.HeaderInDetail>
      <S.TitleContainer>
        <CategoryBadge category={category} />
        {title}
      </S.TitleContainer>
    </S.HeaderInDetail>
  );
};

export default DetailHeader;
