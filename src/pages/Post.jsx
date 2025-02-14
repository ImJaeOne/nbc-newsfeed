import React, { useState } from 'react';
import S from '../style/Post/Post.style';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

const MOCK_DATA = ['일상', '운동', '취미', '맛집', '기타'];
const resetPost = {
  post_title: '',
  post_category: '',
  post_detail: '',
  post_img_url: null,
};

const Post = () => {
  const [post, setPost] = useState(resetPost);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleFileChange = (e) => {
    const fileImage = URL.createObjectURL(e.target.files[0]);
    setPost((prev) => ({ ...prev, post_img_url: fileImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.post_title || !post.post_category || !post.post_detail) {
      alert('모든 항목을 입력해 주세요.');
      setPost(resetPost);
      return;
    }

    const { error } = await supabase.from('posts').insert(post);
    if (error) {
      alert('게시물 게시 실패');
      console.log('게시물 게시 실패: ', error);
      return;
    }
    alert('게시되었습니다.');
    setPost(resetPost);
    navigate('/');
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.PostSection>
        <S.PostLabel htmlFor="post-title">
          제목
          <S.postSelect
            name="post_category"
            value={post.post_category}
            onChange={handleChange}
          >
            <option value="">카테고리를 선택하세요</option>
            {MOCK_DATA.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </S.postSelect>
          <S.PostInput
            id="post-title"
            name="post_title"
            type="text"
            value={post.post_title}
            onChange={handleChange}
          />
        </S.PostLabel>
      </S.PostSection>
      <S.PostSection>
        <S.PostLabel>
          내용
          <S.PostInput
            name="post_detail"
            type="text"
            value={post.post_detail}
            onChange={handleChange}
          />
        </S.PostLabel>
      </S.PostSection>
      <S.PostSection>
        <label htmlFor="input-file">첨부파일</label>
        <S.FileLabel htmlFor="input-file">{post.post_img_url}</S.FileLabel>
        <label htmlFor="input-file">업로드</label>
        <input
          type="file"
          id="input-file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </S.PostSection>
      <S.PostSubmitButton type="submit">제출</S.PostSubmitButton>
    </S.FormContainer>
  );
};

export default Post;
