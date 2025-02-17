import { useState } from 'react';
import S from '../style/Post/Post.style';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import { validateFile } from '../utils/validateFile';
import { postCategory } from '../utils/category';

const resetPost = {
  post_title: '',
  post_category: '',
  post_detail: '',
};

const Post = () => {
  const [post, setPost] = useState(resetPost);
  const [postImg, setPostImg] = useState(null);
  const [category, setCategory] = useState(postCategory);
  const navigate = useNavigate();
  const imgURL = postImg && URL.createObjectURL(postImg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = postCategory.map((item) => {
      return { ...item, checked: item.categoryName === e.target.value };
    });
    setCategory(selectedCategory);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { fileResult } = validateFile(file);

    switch (fileResult) {
      case 'undefinedFile': {
        setPostImg(null);
        break;
      }
      case 'notImageFile': {
        alert('이미지 파일을 넣어주세요!');
        setPostImg(null);
        break;
      }
      case 'isImageFile': {
        setPostImg(file);
        break;
      }
    }
    return;
  };

  // 유효성 검사
  const validateSubmit = () => {
    if (!post.post_title || !post.post_category || !post.post_detail) {
      alert('모든 항목을 입력해 주세요.');
      return false;
    }

    if (post.post_title.trim() === '' || post.post_detail.trim() === '') {
      alert('내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  // 사진 없을 때 포스트
  const withoutImgPost = async () => {
    // post_num을 반환해줘야 하므로  trycatch 없이 에러처리
    const {
      data: [{ post_num }],
      error,
    } = await supabase.from('posts').insert(post).select();

    if (error) {
      alert('게시물 게시 실패');
      console.error('게시물 게시 실패: ', error);
      return { postSuccess: false };
    }

    return { postSuccess: true, post_num };
  };

  // 사진 storage로 업로드
  const uploadImage = async () => {
    const imageName = new Date().getTime() + postImg.lastModified;

    try {
      const { error } = await supabase.storage
        .from('test-bucket')
        .upload(`public/${imageName}`, postImg);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert('이미지 게시 실패');
      console.error('이미지 게시 실패:', error);
      return { uploadSuccess: false };
    }

    return { uploadSuccess: true, imageName };
  };

  // 사진과 함께 포스트
  const withImgPost = async (post_num, imageName) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          ...post,
          post_img_url: `${import.meta.env.VITE_APP_SUPABASE_URL}/storage/v1/object/public/test-bucket/public/${imageName}`,
        })
        .eq('post_num', post_num);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
      console.error(error);
      return { postImgSuccess: false };
    }

    return { postImgSuccess: true };
  };

  // 제출 관리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSubmit()) return;

    const { postSuccess, post_num } = await withoutImgPost();
    if (!postSuccess) return;

    alert('게시되었습니다.');
    setPost(resetPost);
    setPostImg(null);

    setTimeout(() => {
      navigate('/');
    }, 500);

    if (!postImg) return;

    const { uploadSuccess, imageName } = await uploadImage();
    if (!uploadSuccess) return;

    const { postImgSuccess } = await withImgPost(post_num, imageName);
    if (!postImgSuccess) return;
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.CommonSection $section="fileSection">
        <label htmlFor="input-file">첨부파일</label>
        <S.FileLabel htmlFor="input-file">
          <img
            style={{
              width: '100%',
              objectFit: 'scale-down',
              borderRadius: '30px',
            }}
            src={imgURL}
          />
        </S.FileLabel>
        <input
          type="file"
          id="input-file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </S.CommonSection>

      <S.CommonSection>
        <S.PostPart $type="category">
          범주
          <S.CategoryWrapper>
            {category.map((item) => {
              return (
                <S.CategoryLabel
                  htmlFor={item.categoryName}
                  key={item.categoryName}
                >
                  <S.CategoryInput
                    type="radio"
                    name="post_category"
                    id={item.categoryName}
                    value={item.categoryName}
                    onChange={handleCategoryChange}
                  />
                  {item.checked ? item.categoryCheckedIcon : item.categoryIcon}
                </S.CategoryLabel>
              );
            })}
          </S.CategoryWrapper>
        </S.PostPart>

        <S.PostPart>
          <S.PostLabel htmlFor="post-title">
            제목
            <S.PostInput
              id="post-title"
              name="post_title"
              type="text"
              value={post.post_title}
              onChange={handleChange}
            />
          </S.PostLabel>
        </S.PostPart>

        <S.PostPart>
          <S.PostLabel>
            내용
            <S.PostTextArea
              name="post_detail"
              type="text"
              value={post.post_detail}
              onChange={handleChange}
            />
          </S.PostLabel>
        </S.PostPart>
        <S.PostSubmitButton type="submit">제출</S.PostSubmitButton>
      </S.CommonSection>
    </S.FormContainer>
  );
};

export default Post;
