import { IconBtn } from './IconBtn';
import { FaRegComment } from 'react-icons/fa';
import styled from 'styled-components';

// prop에 있어야 할 정보
// post -> select(`comments(post_num)`)
// ***post 가져올 때의 select 쿼리문 내의 위 구문 포함***
// size는 숫자만 적어주시면 됩니다.

const CommentBtn = ({ post, size }) => {
  return (
    <IconBtn>
      <FaRegComment size={size} />
      <LenSpan $size={size}>{post.comments.length}</LenSpan>
    </IconBtn>
  );
};

export default CommentBtn;

const LenSpan = styled.span`
  margin-left: 5px;
  font-size: ${(props) => `${props.$size}px`};
`;
