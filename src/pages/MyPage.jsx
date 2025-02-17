import MyPostList from '../components/MyPage/MyPostList';
import MyInfo from '../components/MyPage/MyInfo';
import S from '../style/MyPage/MyPage.style';

const MyPage = () => {
  return (
    <S.MyPageContainer>
      <MyInfo />
      <MyPostList />
    </S.MyPageContainer>
  );
};

export default MyPage;
