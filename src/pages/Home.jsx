import { useEffect, useState } from 'react';
import { getTimeAgo } from '../utils/dateUtils';
import PostCard from '../components/Home/PostCard';
import S from '../style/Home/Home.style';
import { fetchPostsData } from '../api/api';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsData().then((data) => {
      const formattedPostsDate = data.map((post) => ({
        ...post,
        post_date: getTimeAgo(post.post_date),
      }));
      setPosts(formattedPostsDate);
    });
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
