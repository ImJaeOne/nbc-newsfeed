import React, { useContext } from 'react';
import UserProfile from '../common/UserProfile';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';
import S from '../../style/Home/PostCard.style';

const PostList = ({ post }) => {
  const { user } = useContext(AuthContext);

  const isLiked = post.post_like.includes(
    (user_num) => user_num === user.user_num,
  );
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
        <S.CardWrapper>
          {post.post_img_url !== '' && post.post_img_url !== null ? (
            <S.CardImg src={post.post_img_url} alt="사진" />
          ) : (
            <S.CardImgSkeleton>No Image</S.CardImgSkeleton>
          )}
        </S.CardWrapper>
        <S.CardFooter>
          <S.CardIconWrapper>
            {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            {post.post_like.length}
            <FaRegComment /> {post.post_like.length}
          </S.CardIconWrapper>
          {post.post_date}
        </S.CardFooter>
      </S.CardContainer>
    </div>
  );
};

export default PostList;
