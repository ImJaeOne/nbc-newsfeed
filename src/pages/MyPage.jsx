import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useEffect } from 'react';
import UserProfile from '../components/common/UserProfile';

const dummyArr = Array.from({ length: 4 }, (_, idx) => ({
  post_num: idx + 1,
  post_title: '춥고 배고프고 졸려',
  post_date: '1 hours ago',
  post_img: '',
  post_like: 1,
  user_id: '임재원',
}));

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editedNickname, setEditedNickname] = useState('');
  const [editedIntro, setEditedIntro] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFileAndGetUrl = async () => {
    if (!file || !user.num) return null;
    const filePath = `test-bucket/${crypto.randomUUID()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('test-bucket')
      .upload(filePath, file);
    if (uploadError) {
      console.error('파일 업로드 에러:', uploadError);
      return;
    }

    const { data, error } = supabase.storage
      .from('test-bucket')
      .getPublicUrl(filePath);
    if (error) {
      console.error('public URL 가져오기 에러:', error);
      return;
    }
    return data.publicUrl;
  };

  const handleUserInfoChange = async () => {
    if (isEditing) {
      if (!editedNickname.replaceAll(' ', '')) {
        alert('닉네임을 1자 이상 입력해주세요!!');
        return;
      }
      let updatedProfileImg = user.profile;

      if (file) {
        const url = await uploadFileAndGetUrl();
        if (url) {
          updatedProfileImg = url;
        }
      }

      setUser({
        ...user,
        nickname: editedNickname,
        intro: editedIntro,
        profile: updatedProfileImg,
      });
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (!user.num || !user.nickname) return;

    const updateUserInfo = async () => {
      try {
        const { error } = await supabase
          .from('users')
          .update({
            user_nickname: user.nickname,
            user_intro: user.intro,
            user_profile: user.profile,
          })
          .eq('user_num', user.num);
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    };

    updateUserInfo();
  }, [user.num, user.nickname, user.intro, user.profile]);

  return (
    <div>
      <StMyInfoChange>
        <StProfileWrapper>
          {user.profile && (
            <UserProfile
              src={user.profile}
              alt={'Profile'}
              size="160px"
              margin="30px"
            />
          )}
          {isEditing ? <input type="file" onChange={handleFileChange} /> : ''}
        </StProfileWrapper>
        <StMyInfoWrapper>
          <StNickname>{user.nickname}</StNickname>
          {isEditing ? (
            <input
              type="text"
              value={editedNickname}
              onChange={(e) => setEditedNickname(e.target.value)}
            />
          ) : (
            ''
          )}
          <StIntroduce>{user.intro}</StIntroduce>
          {isEditing ? (
            <textarea
              name=""
              id=""
              value={editedIntro}
              onChange={(e) => setEditedIntro(e.target.value)}
            ></textarea>
          ) : (
            ''
          )}
        </StMyInfoWrapper>
        <StEditBtn value={isEditing} onClick={handleUserInfoChange}>
          내 정보 수정하기
        </StEditBtn>
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

const StProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  padding: 20px 0;
  background-color: #fee3a2;
  height: auto;
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
