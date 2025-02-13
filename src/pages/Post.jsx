import React, { useState } from 'react';
import S from './Post.style';
const MOCK_DATA = ['일상', '운동', '취미', '맛집', '기타'];

const Post = () => {
  const [post, setPost] = useState({
    postTitle: '',
    postCategory: '',
    postContent: '',
    postFile: null,
  });
  console.log(post);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <S.FormContainer onSubmit={() => {}}>
      <S.PostSection>
        <S.PostLabel>제목</S.PostLabel>
        <select
          name="postCategory"
          value={post.postCategory}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          {MOCK_DATA.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <S.PostInput
          name="postTitle"
          type="text"
          value={post.postTitle}
          onChange={handleChange}
        />
      </S.PostSection>
      <S.PostSection>
        <S.PostLabel>내용</S.PostLabel>
        <S.PostInput
          name="postContent"
          type="text"
          value={post.postContent}
          onChange={handleChange}
        />
      </S.PostSection>
      <S.PostSection>
        <label>첨부파일</label>
        <S.FileLabel htmlFor="input-file">{post.postFile}</S.FileLabel>
        <label htmlFor="input-file">업로드</label>
        <input
          type="file"
          name=""
          id="input-file"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </S.PostSection>
      <S.PostSubmitButton type="submit">제출</S.PostSubmitButton>
    </S.FormContainer>
  );
};

export default Post;
