import styled from 'styled-components';
import sampleImg from '../assets/다운로드.jpeg';
import { useState } from 'react';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';

const dummyArr = Array.from({ length: 50 }, (_, idx) => ({
  post_num: idx + 1,
  post_title: '춥고 배고프고 졸려',
  post_date: '1 hours ago',
  post_img: sampleImg,
  post_like: 1,
  user_id: '임재원',
}));

const user = {
  user_num: 0,
  user_email: 'asd123@naver.com',
  user_nickname: '임재원',
  user_joindate: '2025.01.01',
  post_like: [1, 2, 3],
};

const Home = () => {
  const [posts, setPosts] = useState(dummyArr);
  const [userLikes, setUserLikes] = useState(user.post_like);

  const handleClickLike = (postNum) => {
    setUserLikes((prevLikes) =>
      prevLikes.includes(postNum)
        ? prevLikes.filter((num) => num !== postNum)
        : [...prevLikes, postNum],
    );
  };

  return (
    <HomeContainer>
      {posts.map((post, idx) => {
        const isLiked = userLikes.includes(post.post_num);

        return (
          <Card key={idx}>
            <CardHeader>
              <CardProfile>
                <RoundButton />
                {post.user_id}
              </CardProfile>
              더 보기
            </CardHeader>
            <CardTitle>{post.post_title}</CardTitle>
            <CardImg src={post.post_img} alt="사진" />
            <CardFooter>
              <CardIconContainer>
                {isLiked ? (
                  <FaHeart
                    color="red"
                    onClick={() => handleClickLike(post.post_num)}
                  />
                ) : (
                  <FaRegHeart onClick={() => handleClickLike(post.post_num)} />
                )}
                {userLikes.includes(post.post_num)
                  ? post.post_like + 1
                  : post.post_like}
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

const CardImg = styled.img`
  height: 100%;
  max-height: 150px;
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
