import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import LikeBtn from '../common/LikeBtn';
import S from '../../style/MyPage/MyPost.style';
import CommentBtn from '../common/CommentBtn';
import { useNavigate } from 'react-router-dom';

const MyPost = ({ post }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/detail?post_id=${post.post_num}`);
  };
  return (
    <S.LinkToDetail onClick={handlePostClick}>
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
          <S.LikeWrapper>
            <S.IconWrapper>
              <LikeBtn user={user} post={post} size={12} able={false} />
              <CommentBtn post={post} size={12} />
            </S.IconWrapper>
            <S.PostDate>{post.post_date}</S.PostDate>
          </S.LikeWrapper>
        </S.MyPostWrapper>
      </S.PostCardContainer>
    </S.LinkToDetail>
  );
};

export default MyPost;
