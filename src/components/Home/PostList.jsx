import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../common/UserProfile';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthProvider';

const PostList = ({ post }) => {
  const { user } = useContext(AuthContext);

  const isLiked = post.post_like.includes(
    (user_num) => user_num === user.user_num,
  );
  return (
    <div>
      <CardContainer
        key={post.post_num}
        to={`/detail?post_id=${post.post_num}`}
      >
        <CardHeader>
          <CardProfile>
            <UserProfile
              src={post.users.user_profile}
              alt="프로필 사진"
              size="50px"
            />
            {post.users.user_nickname}
          </CardProfile>
        </CardHeader>
        <CardTitle>{post.post_title}</CardTitle>
        <CardWrapper>
          {post.post_img_url !== '' && post.post_img_url !== null ? (
            <CardImg src={post.post_img_url} alt="사진" />
          ) : (
            <CardImgSkeleton>No Image</CardImgSkeleton>
          )}
        </CardWrapper>
        <CardFooter>
          <CardIconContainer>
            {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            {post.post_like.length}
            <FaRegComment /> {post.post_like.length}
          </CardIconContainer>
          {post.post_date}
        </CardFooter>
      </CardContainer>
    </div>
  );
};

export default PostList;

const CardContainer = styled(Link)`
  width: 300px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fee3a2;
  border: 1px solid #d2a679;
  border-radius: 5px;
  transition:
    border 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    border: 1px solid #b88650;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardProfile = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #ce9b68;
`;

const CardTitle = styled.div`
  margin-left: 10px;
  font-weight: bolder;
  font-size: larger;
  color: #333;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  overflow: hidden;
`;

const CardImg = styled.img`
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const CardImgSkeleton = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffda85;
  background-size: 400% 100%;
  color: ${({ theme }) => theme.colors.haeder_text_color};
  border-radius: 5px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
`;

const CardIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #333;
`;
