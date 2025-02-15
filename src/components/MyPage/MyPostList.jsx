import { useContext } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';

const dummyArr = Array.from({ length: 4 }, (_, idx) => ({
  post_num: idx + 1,
  post_title: '춥고 배고프고 졸려',
  post_date: '1 hours ago',
  post_like: 1,
  user_id: '임재원',
}));

const MyPostList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  console.log(user.num);

  useEffect(() => {
    const getUserPostData = async () => {
      const { data, error } = supabase
        .from('posts')
        .select('*')
        .eq('user_num', user.num);
      console.log(data);
      if (error) console.log(error.message);
    };

    getUserPostData();
  });

  return (
    <StMyPostList>
      {dummyArr.map((post) => {
        return (
          <CardContainer key={post.post_num}>
            <PostImage>이미지</PostImage>
            <MyPostWrapper>
              <MyPostTitle>제목</MyPostTitle>
              <div>날짜</div>
              <div>좋아요</div>
            </MyPostWrapper>
          </CardContainer>
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
const PostImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 5px;
`;

const StMyPostList = styled.div`
  background-color: #fee3a2;
  height: 500px;
  border-radius: 30px;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 80px;
`;

export default MyPostList;
