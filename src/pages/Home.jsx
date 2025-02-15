import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { supabase } from '../supabase/client';
import { AuthContext } from '../contexts/AuthProvider';
import { getTimeAgo } from '../utils/dateUtils';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

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
        const { data, error } = await supabase.from('posts').select(`
    *, 
    users: user_num(user_nickname), 
    post_like(post_num)
  `);
        /**
         * post_date를 변환한 후 최신 순으로 정렬
         * 현재 시간 기준으로 시간 계산
         * @type {Object[]}
         */
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
          // 쿼리 파라미터를 이용해 게시물 상세 페이지로 이동
          <CardContainer
            key={post.post_num}
            to={`/detail?post_id=${post.post_num}`}
          >
            <CardHeader>
              <CardProfile>
                <RoundButton />
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
                <FaRegComment /> 1
              </CardIconContainer>
              {post.post_date}
            </CardFooter>
          </CardContainer>
        );
      })}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px 10px;
  gap: 30px;
  background-color: #fffbf0;
`;

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
