import React from 'react';
import { IconBtn } from './IconBtn';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styled from 'styled-components';

// prop에 있어야 할 정보
// AuthContext를 통해 가져온 user -> 로그인한 사람이 해당 게시글의 좋아요를 눌렀는지 확인
// post -> select(`post_like(post_num),comments(post_num)`)
// ***post 가져올 때의 select 쿼리문 내의 위 구문 포함***

const LikeBtn = ({ user, post }) => {
  const isLiked = post.post_like.includes(
    (user_num) => user_num === user.user_num,
  );
  return (
    <IconBtn>
      {isLiked ? <FaHeart color="red" /> : <FaRegHeart size={20} />}
      <LenSpan>{post.post_like.length}</LenSpan>
    </IconBtn>
  );
};

export default LikeBtn;

const LenSpan = styled.span`
  margin-left: 5px;
  font-size: 20px;
`;
