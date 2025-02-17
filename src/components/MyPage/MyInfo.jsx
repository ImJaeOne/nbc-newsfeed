import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import UserProfile from '../common/UserProfile';
import S from '../../style/MyPage/MyInfo.style';

const MyInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editedNickname, setEditedNickname] = useState(user.nickname);
  const [editedIntro, setEditedIntro] = useState(user.intro);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState('');

  const handleFileChange = (e) => {
    const inputFile = e.target.files;
    if (!inputFile) {
      return;
    } else {
      setImg(URL.createObjectURL(inputFile[0]));
      setFile(inputFile[0]);
    }
  };

  const uploadFileAndGetUrl = async () => {
    if (!file || !user.num) return null;
    const filePath = `user-profile/${crypto.randomUUID()}_${file.lastModified}`;

    const { error: uploadError } = await supabase.storage
      .from('user-profile')
      .upload(filePath, file);
    if (uploadError) {
      console.error('파일 업로드 에러:', uploadError);
      return;
    }

    const { data, error } = supabase.storage
      .from('user-profile')
      .getPublicUrl(filePath);
    if (error) {
      console.error('public URL 가져오기 에러:', error);
      return;
    }
    return data.publicUrl;
  };

  const handleUserInfoChange = async () => {
    if (isEditing) {
      if (!editedNickname.trim()) {
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
    <S.MyInfoDashboard>
      <S.ProfileImgWrapper>
        <UserProfile
          src={img || user.profile}
          alt="프로필 사진"
          size="160px"
          margin="30px"
        />
        {isEditing && (
          <>
            <S.FileInput
              id="fileUpload"
              type="file"
              onChange={handleFileChange}
            />
            <S.FileLabel htmlFor="fileUpload">파일 선택</S.FileLabel>
          </>
        )}
      </S.ProfileImgWrapper>
      <S.TextInfoWrapper>
        {!isEditing && (
          <>
            <S.MyNickname>{user.nickname}</S.MyNickname>
            <S.MyIntro>{user.intro}</S.MyIntro>
          </>
        )}
        {isEditing && (
          <>
            <S.NicknameInput
              type="text"
              value={editedNickname}
              onChange={(e) => setEditedNickname(e.target.value)}
            />
            <S.IntroInput
              value={editedIntro}
              onChange={(e) => setEditedIntro(e.target.value)}
            />
          </>
        )}
      </S.TextInfoWrapper>
      <S.EditBtn onClick={handleUserInfoChange}>
        {isEditing ? '수정 완료' : '내 정보 수정하기'}
      </S.EditBtn>
    </S.MyInfoDashboard>
  );
};

export default MyInfo;
