import styled from 'styled-components';
import sampleImg from '../assets/다운로드.jpeg';
import { useContext, useEffect, useState } from 'react';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { supabase } from '../supabase/client';
import { AuthContext } from '../contexts/AuthProvider';
import { getTimeAgo } from '../utils/dateUtils';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data, error } = await supabase.from('posts').select(`
    *, 
    users:user_num(user_nickname), 
    post_like(post_num)
  `);
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
        const isLiked = post.post_like.includes(
          (user_num) => user_num === user.user_num,
        );
        return (
          <Card key={post.post_num}>
            <CardHeader>
              <CardProfile>
                <RoundButton />
                {post.users.user_nickname}
              </CardProfile>
              더 보기
            </CardHeader>
            <CardTitle>{post.post_title}</CardTitle>
            <CardWrapper>
              <CardImg src={post.post_img_url} alt="사진" />
            </CardWrapper>
            <CardFooter>
              <CardIconContainer>
                {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                {post.post_like.length}
                <FaRegComment /> 1
              </CardIconContainer>
              {post.post_date}
            </CardFooter>
          </Card>
        );
      })}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  background-color: #fffbf0;
`;

const Card = styled.div`
  width: 300px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fee3a2;
  border: 1px solid #ccc;
  border-radius: 5px;
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
`;

const CardTitle = styled.div`
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

const RoundButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #857040;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #a67d40;
  }
`;
