import React, { useContext } from 'react';
import UserProfile from '../common/UserProfile';
import { AuthContext } from '../../contexts/AuthProvider';
import S from '../../style/Home/PostCard.style';
import LikeBtn from '../common/LikeBtn';
import CommentBtn from '../common/CommentBtn';

const PostList = ({ post }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <S.CardContainer
        key={post.post_num}
        to={`/detail?post_id=${post.post_num}`}
      >
        <S.CardHeader>
          <S.CardProfile>
            <UserProfile
              src={post.users.user_profile}
              alt="프로필 사진"
              size="50px"
            />
            {post.users.user_nickname}
          </S.CardProfile>
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
    </div>
  );
};

export default React.memo(PostList);
