import React, { useState } from 'react';
const MOCK_DATA = ['일상', '운동', '취미', '맛집', '기타'];

const Post = () => {
  const [postFile, setPostFile] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  return (
    <form onSubmit={() => {}}>
      <section>
        <label>제목</label>
        <select name="" id="">
          <option value="">카테고리를 선택하세요</option>
          {MOCK_DATA.map((item) => (
            <option>{item}</option>
          ))}
        </select>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </section>
      <section>
        <label>내용</label>
        <input
          type="text"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </section>
      <section>
        <label>첨부파일</label>
        <label htmlFor="input-file">{postFile}</label>
        <label htmlFor="input-file">업로드</label>
        <input
          type="file"
          name=""
          id="input-file"
          onChange={(e) => setPostFile(e.target.value)}
          style={{ display: 'none' }}
        />
      </section>
      <button type="submit">제출</button>
    </form>
  );
};

export default Post;
