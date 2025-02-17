import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import LikeBtn from '../common/LikeBtn';
import S from '../../style/MyPage/MyPost.style';
import CommentBtn from '../common/CommentBtn';

const MyPost = ({ post }) => {
  const { user } = useContext(AuthContext);
  return (
    <S.LinkToDetail to={`/detail?post_id=${post.post_num}`}>
      <S.PostCardContainer>
        <S.ProfileWrapper>
          {post.post_img_url ? (
            <S.ProfileImg src={post.post_img_url} alt="프로필" />
          ) : (
            <S.ProfileAlt>No Image</S.ProfileAlt>
          )}
        </S.ProfileWrapper>
        <S.MyPostWrapper>
          <S.PostTitle>{post.post_title}</S.PostTitle>
          <S.PostDate>{post.post_date}</S.PostDate>
          <S.LikeWrapper>
            <LikeBtn user={user} post={post} size={12} able={false} />
            <CommentBtn post={post} size={12} />
          </S.LikeWrapper>
        </S.MyPostWrapper>
      </S.PostCardContainer>
    </S.LinkToDetail>
  );
};

export default MyPost;
