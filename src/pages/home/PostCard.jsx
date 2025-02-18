import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import S from './homeStyle/PostCard.style';
import UserProfile from '../../components/common/UserProfile';
import { CategoryBadge } from '../../components/common/CategoryBadge';
import LikeBtn from '../../components/common/LikeBtn';
import CommentBtn from '../../components/common/CommentBtn';

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePostClick = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);

    navigate(`/detail?post_id=${post.post_num}`);
  };

  return (
    <S.CardContainer key={post.post_num} onClick={handlePostClick}>
      <S.CardHeader>
        <S.CardProfile>
          <UserProfile
            src={post.users.user_profile}
            alt="프로필 사진"
            size="50px"
          />
          {post.users.user_nickname}
        </S.CardProfile>
        <CategoryBadge category={post.post_category} />
      </S.CardHeader>
      <S.CardTitle>{post.post_title}</S.CardTitle>
      <S.CardImgWrapper>
        {post.post_img_url !== '' && post.post_img_url !== null ? (
          <S.CardImg src={post.post_img_url} alt="사진" />
        ) : (
          <S.CardImgSkeleton>No Image</S.CardImgSkeleton>
        )}
      </S.CardImgWrapper>
      <S.CardFooter>
        <S.CardIconWrapper>
          <LikeBtn user={user} post={post} size={20} />
          <CommentBtn post={post} size={20} />
        </S.CardIconWrapper>
        {post.post_date}
      </S.CardFooter>
    </S.CardContainer>
  );
};

export default PostCard;
