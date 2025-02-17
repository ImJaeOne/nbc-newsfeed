import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { getTimeAgo } from '../utils/dateUtils';
import PostCard from '../components/Home/PostCard';
import S from '../style/Home/Home.style';

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
            `*, users: user_num(user_nickname, user_profile), post_like(user_num),comments(post_num)`,
          )
          .order('post_date', { ascending: false });

        const sortedPosts = data.map((post) => ({
          ...post,
          post_date: getTimeAgo(post.post_date),
        }));

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

  useEffect(() => {
    const savedScrollY = sessionStorage.getItem('scrollPosition');

    if (savedScrollY !== null) {
      setTimeout(() => {
        window.scroll({
          top: parseInt(savedScrollY, 10),
          behavior: 'smooth',
        });
      }, 500);
    }
  }, []);

  return (
    <S.HomeContainer>
      {posts.map((post) => {
        return <PostCard key={post.post_num} post={post} />;
      })}
    </S.HomeContainer>
  );
};

export default Home;
