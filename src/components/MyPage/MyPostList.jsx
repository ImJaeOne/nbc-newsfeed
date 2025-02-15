import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import { getTimeAgo } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

const MyPostList = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*,  users: user_num(user_nickname), post_like(post_num)')
          .eq('user_num', user.num);

        const sortedMyPosts = data
          .map((post) => ({
            ...post,
            post_date: getTimeAgo(post.post_date),
          }))
          .reverse();

        setMyPosts(sortedMyPosts);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  });
  return (
    <StMyPostList>
      {myPosts.map((post) => {
        return (
          <StLink key={post.post_num} to={`/detail?post_id=${post.post_num}`}>
            <CardContainer>
              <ImageWrapper>
                {post.post_img_url && (
                  <PostImage src={post.post_img_url} alt="이미지" />
                )}
              </ImageWrapper>
              <MyPostWrapper>
                <MyPostTitle>{post.post_title}</MyPostTitle>
                <PostDate>{post.post_date}</PostDate>
                <Like>좋아요</Like>
              </MyPostWrapper>
            </CardContainer>
          </StLink>
        );
      })}
    </StMyPostList>
  );
};

const ImageWrapper = styled.div`
  width: 100%;
  height: 60%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const MyPostWrapper = styled.div`
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MyPostTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const CardContainer = styled.div`
  width: 200px;
  height: 280px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 210px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 168px;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const StMyPostList = styled.div`
  width: 100%;
  background-color: #fee3a2;
  border-radius: 30px;
  margin: 10px auto;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  overflow: scroll;
`;

const PostDate = styled.div`
  font-size: 14px;
  color: #666;
`;

const Like = styled.div`
  font-size: 14px;
  color: #999;
`;

export default MyPostList;
