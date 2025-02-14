import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase/client';

const Detail = () => {
  const [post, setPost] = useState({
    title: '',
    detail: '',
    date: '',
    category: '',
    nickname: '',
    url: '',
  });

  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('post_num', 87)
        .single();

      if (error) {
        console.error(error);
      } else {
        setPost({
          title: data.post_title,
          detail: data.post_detail,
          date: data.post_date,
          category: data.post_category,
          nickname: data.user_num,
          url: data.post_img_url,
        });
        console.log(post);
      }
    };
    getPost();
  }, []);

  const { title, detail, date, category, nickname, url } = post;

  return (
    <StDetailContainer>
      <StHeaderInDetail>
        <div>{title}</div>
        <StUserInfo>
          <StImageField />
          <div>{nickname}</div>
        </StUserInfo>
      </StHeaderInDetail>
      <StMainContent>
        <StPhotoBox>사진박스</StPhotoBox>
        <StContentBox>
          {detail}
          <StButtonBox>
            <button>좋아요</button>
            <button>코멘트</button>
          </StButtonBox>
        </StContentBox>
        <StCommentBox>댓글박스</StCommentBox>
      </StMainContent>
    </StDetailContainer>
  );
};

export default Detail;

const StDetailContainer = styled.div`
  width: 90%;
  max-width: 900px;
  height: auto;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: orange;
  border-radius: 30px;
`;

const StHeaderInDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
  padding: 10px 20px;
  color: white;
  border-radius: 30px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StImageField = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgray;
  margin-left: 10px;
`;

const StMainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StPhotoBox = styled.div`
  flex: 1;
  height: 300px;
  background-color: lightgray;
  border-radius: 30px;
  text-align: center;
  line-height: 300px;
  object-fit: cover;
`;

const StContentBox = styled.div`
  flex: 1.5;
  height: 300px;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
  box-sizing: border-box;
`;

const StCommentBox = styled.div`
  flex: 1;
  height: 300px;
  background-color: #f3f3f3;
  border-radius: 30px;
  text-align: center;
  line-height: 300px;
  box-sizing: border-box;
`;

const StButtonBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-left: auto;
  box-sizing: border-box;
`;
