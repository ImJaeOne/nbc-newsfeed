import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { getTimeAgo } from '../utils/dateUtils';
import PostList from '../components/Home/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /**
     * 게시글 데이터를 불러오는 함수
     * @async
     * @function fetchPostData
     * @returns {Promise<void>} - Supabase에서 데이터를 가져와 상태를 업데이트함
     */
    const fetchPostData = async () => {
      /**
       * Supabase에서 posts 테이블의 데이터를 가져옴
       * - users 테이블에서 user_num과 일치하는 user_nickname을 포함
       * - post_like 테이블에서 post_num과 일치하는 좋아요 정보 포함
       * @type {{ data: Object[], error: Error }}
       */
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(
            `*, users: user_num(user_nickname, user_profile), post_like(post_num)`,
          );

        const sortedPosts = data
          .map((post) => ({
            ...post,
            post_date: getTimeAgo(post.post_date),
          }))
          .reverse();

        setPosts(sortedPosts);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, []);

  return (
    <HomeContainer>
      {posts.map((post) => {
        return <PostList key={post.post_num} post={post} />;
      })}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px 20px;
  background-color: #fffbf0;
`;
