import MyInfo from './MyInfo';
import S from './myPageStyle/MyPage.style';
import MyPostList from './MyPostList';

const MyPage = () => {
  return (
    <S.MyPageContainer>
      <MyInfo />
      <MyPostList />
    </S.MyPageContainer>
  );
};

export default MyPage;
