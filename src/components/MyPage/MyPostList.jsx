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
          <Link key={post.post_num} to={`/detail?post_id=${post.post_num}`}>
            <CardContainer>
              {post.post_img_url && (
                <PostImage src={post.post_img_url} alt="이미지" />
              )}
              <MyPostWrapper>
                <MyPostTitle>{post.post_title}</MyPostTitle>
                <div>{post.post_date}</div>
                <div>좋아요</div>
              </MyPostWrapper>
            </CardContainer>
          </Link>
        );
      })}
    </StMyPostList>
  );
};

const MyPostWrapper = styled.div`
  margin: 10px;
`;

const MyPostTitle = styled.div`
  font-size: 30px;
`;

const CardContainer = styled.div`
  width: 450px;
  background-color: #b4972b;
  height: 150px;
  border-radius: 5px;
  display: flex;
`;
const PostImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 5px;
`;

const StMyPostList = styled.div`
  background-color: #fee3a2;
  height: auto;
  border-radius: 30px;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 80px;
`;

export default MyPostList;
