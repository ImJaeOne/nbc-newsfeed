import { useEffect, useState } from 'react';
import { getTimeAgo } from '../utils/dateUtils';
import PostCard from '../components/Home/PostCard';
import S from '../style/Home/Home.style';
import { fetchPostsData } from '../api/api';

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
      <CategoryButtons />
      {posts.map((post) => {
        return <PostCard key={post.post_num} post={post} />;
      })}
    </S.HomeContainer>
  );
};

export default Home;
