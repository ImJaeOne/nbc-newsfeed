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
  const [editedNickname, setEditedNickname] = useState(user.nickname);
  const [editedIntro, setEditedIntro] = useState(user.intro);
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
          <UserProfile
            src={user.profile}
            alt="프로필 사진"
            size="160px"
            margin="30px"
          />
          {/* 파일 업로드 인풋 */}
          {isEditing && (
            <>
              <StFileInput
                id="fileUpload"
                type="file"
                onChange={handleFileChange}
              />
              <StFileLabel htmlFor="fileUpload">파일 선택</StFileLabel>
            </>
          )}
        </StProfileWrapper>

        <StMyInfoWrapper>
          {/* 닉네임/소개글 (보기 모드) */}
          {!isEditing && (
            <>
              <StNickname>{user.nickname}</StNickname>
              <StIntroduce>{user.intro}</StIntroduce>
            </>
          )}

          {/* 닉네임/소개글 (수정 모드) */}
          {isEditing && (
            <>
              <StInput
                type="text"
                value={editedNickname}
                onChange={(e) => setEditedNickname(e.target.value)}
              />
              <StTextarea
                value={editedIntro}
                onChange={(e) => setEditedIntro(e.target.value)}
              />
            </>
          )}
        </StMyInfoWrapper>

        <StEditBtn onClick={handleUserInfoChange}>
          {isEditing ? '수정 완료' : '내 정보 수정하기'}
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
  align-items: center;
`;

const StMyPostList = styled.div`
  background-color: #fee3a2;
  border-radius: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 80px;
  margin-top: 20px;
`;

const StMyInfoChange = styled.div`
  padding: 20px 0;
  background-color: #fee3a2;
  border-radius: 30px;
  display: flex;
  position: relative;
  align-items: flex-start;
`;

const StMyInfoWrapper = styled.div`
  margin-left: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column; /* 닉네임, 소개글, 인풋 등을 세로로 쌓기 */
  gap: 10px;
`;

const StNickname = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const StIntroduce = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const StInput = styled.input`
  width: 300px;
  font-size: 25px;
  padding: 8px 12px;
  border: 2px solid #f9d077;
  border-radius: 8px;
  outline: none;
`;
const StTextarea = styled.textarea`
  width: 300px;
  height: 80px;
  font-size: 20px;
  padding: 8px 12px;
  border: 2px solid #f9d077;
  border-radius: 8px;
  outline: none;
  resize: none;
`;

const StFileInput = styled.input`
  display: none; /* 기본 인풋은 숨기고 */
`;
const StFileLabel = styled.label`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f9d077;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #fabc3c;
  }
`;

const StEditBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  /* 파일 선택 라벨과 비슷한 배경/컬러/폰트 크기 */
  background-color: #f9d077;
  color: #fff;
  font-size: 25px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #fabc3c;
  }
`;

export default MyPage;
