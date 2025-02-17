import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { getTimeAgo } from '../utils/dateUtils';
import PostCard from '../components/Home/PostCard';
import S from '../style/Home/Home.style';

import styled from 'styled-components';

const categories = ['전체', '취미', '일상', '운동', '기타', '맛집'];

const CategoryButtons = () => {
  const [selected, setSelected] = useState('전체');

  return (
    <ButtonContainer>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          isSelected={selected === category}
          onClick={() => handleClick(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  position: fixed;
  left: -20px;
  top: 25%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const CategoryButton = styled.button`
  background: ${({ isSelected }) =>
    isSelected
      ? 'linear-gradient(to right, rgba(255, 215, 0, 0.5) 50%, #ffd700 50%)'
      : '#ffeb3b'};
  color: #333;
  font-weight: bold;
  font-size: 20px;
  border: none;
  padding: 10px 15px;
  padding-left: ${({ isSelected }) => (isSelected ? '70px' : '40px')};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '5px 5px 8px rgba(0, 0, 0, 0.3)'
      : '3px 3px 5px rgba(0, 0, 0, 0.2)'};
  transform: ${({ isSelected }) =>
    isSelected ? 'translateX(10px) rotate(-2deg)' : 'rotate(2deg)'};
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${({ isSelected }) =>
      isSelected
        ? 'linear-gradient(to right, rgba(255, 204, 0, 0.5) 50%, #ffca28 50%)'
        : '#ffca28'};
    transform: ${({ isSelected }) =>
      isSelected ? 'translateX(10px) rotate(0deg)' : 'rotate(0deg)'};
  }
`;

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
      <CategoryButtons />
      {posts.map((post) => {
        return <PostCard key={post.post_num} post={post} />;
      })}
    </S.HomeContainer>
  );
};

export default Home;
