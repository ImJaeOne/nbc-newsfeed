import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useEffect } from 'react';
import MyPostList from '../components/MyPage/MyPostList';
import UserProfile from '../components/common/UserProfile';

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
              alt="프로필 사진"
              size="160px"
              margin="30px"
            />
          )}
          {isEditing && <input type="file" onChange={handleFileChange} />}
        </StProfileWrapper>
        <StMyInfoWrapper>
          <StNickname>{user.nickname}</StNickname>
          {isEditing && (
            <input
              type="text"
              value={editedNickname}
              onChange={(e) => setEditedNickname(e.target.value)}
            />
          )}
          <StIntroduce>{user.intro}</StIntroduce>
          {isEditing && (
            <textarea
              name=""
              id=""
              value={editedIntro}
              onChange={(e) => setEditedIntro(e.target.value)}
            ></textarea>
          )}
        </StMyInfoWrapper>
        <StEditBtn value={isEditing} onClick={handleUserInfoChange}>
          내 정보 수정하기
        </StEditBtn>
      </StMyInfoChange>
      <StMyPostList>
        <MyPostList />
      </StMyPostList>
    </div>
  );
};

const StProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const StMyInfoChange = styled.div`
  padding: 20px 0;
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
