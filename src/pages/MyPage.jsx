import styled from 'styled-components';
import sampleImg from '../assets/다운로드.jpeg';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const dummyArr = Array.from({ length: 4 }, (_, idx) => ({
  post_num: idx + 1,
  post_title: '춥고 배고프고 졸려',
  post_date: '1 hours ago',
  post_img: sampleImg,
  post_like: 1,
  user_id: '임재원',
}));

const MyPage = () => {
  const { isLogin, user, setIsLogin } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <StMyInfoChange>
        <RoundButton></RoundButton>
        <StMyInfoWrapper>
          <StNickname>{user.nickname}</StNickname>
          <StIntroduce>{user.introduce}</StIntroduce>
        </StMyInfoWrapper>
        <StEditBtn>내 정보 수정하기</StEditBtn>
      </StMyInfoChange>
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
    </div>
  );
};

const MyPostWrapper = styled.div`
  margin: 10px;
`;

const MyPostTitle = styled.div`
  font-size: 30px;
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

const StMyInfoChange = styled.div`
  background-color: #fee3a2;
  height: 200px;
  border-radius: 30px;
  display: flex;
  position: relative;
`;

const StMyInfoWrapper = styled.div`
  margin-left: 20px;
  margin-top: 40px;
`;

const RoundButton = styled.button`
  width: 160px;
  height: 160px;
  margin: auto 40px;
  border-radius: 50%;
  border: none;
  background-color: #857040;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #a67d40;
  }
`;

const StNickname = styled.p`
  font-size: 40px;
`;

const StIntroduce = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;

const StEditBtn = styled.button`
  position: absolute;
  right: 0;
  margin: 20px 20px;
`;

export default MyPage;
