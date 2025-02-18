import { CategoryBadge } from '../../components/common/CategoryBadge';
import S from './detailStyle/HeaderInDetail.style';

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
