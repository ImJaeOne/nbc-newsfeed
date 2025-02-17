import React, { useEffect, useState } from 'react';
import { IconBtn } from './IconBtn';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { supabase } from '../../supabase/client';

// prop에 있어야 할 정보
// AuthContext를 통해 가져온 user -> 로그인한 사람이 해당 게시글의 좋아요를 눌렀는지 확인
// post -> select(`post_like(user_num)`)
// ***post 가져올 때의 select 쿼리문 내의 위 구문 포함***
// size는 숫자만 적어주시면 됩니다.
// 좋아요 클릭 이벤트가 필요 없을 시 able = false로 props 내려주시면 됩니다.

const LikeBtn = ({ user, post, size, able = true }) => {
  const [likesCount, setLikesCount] = useState(post.post_like.length);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (post.post_like) {
      setIsLiked(post.post_like.some((data) => data.user_num === user.num));
    }
  }, [post.post_like, user.num]);

  const handleLikeBtn = async (e) => {
    e.preventDefault();
    if (isLiked) {
      try {
        const { error } = await supabase
          .from('post_like')
          .delete()
          .eq('post_num', post.post_num)
          .eq('user_num', user.num);
        if (error) {
          throw error;
        }
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { error } = await supabase
          .from('post_like')
          .insert({ post_num: post.post_num });
        if (error) {
          throw error;
        }
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <IconBtn>
      {isLiked ? (
        <FaHeart
          size={size}
          color="red"
          onClick={able ? (e) => handleLikeBtn(e) : undefined}
        />
      ) : (
        <FaRegHeart
          size={size}
          onClick={able ? (e) => handleLikeBtn(e) : undefined}
        />
      )}
      <LenSpan $size={size}>{likesCount}</LenSpan>
    </IconBtn>
  );
};

export default LikeBtn;

const LenSpan = styled.span`
  margin-left: 5px;
  font-size: ${(props) => `${props.$size}px`};
`;
