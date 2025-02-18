import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IoIosClose } from 'react-icons/io';
import { supabase } from '../../supabase/client';
import S from './detailStyle/Detail.style';
import DetailMain from './DetailMain';
import DetailModal from './DetailModal';
import DetailHeader from './DetailHeader';
import { IconBtn } from '../../components/common/IconBtn';

const Detail = () => {
  const [searchParam] = useSearchParams();
  const targetId = searchParam.get('post_id');

  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  // const { user } = useContext(AuthContext);

  const [post, setPost] = useState({
    post_num: targetId,
    title: '',
    detail: '',
    date: '',
    category: '',
    nickname: '',
    img_url: '',
    user_num: '',
    post_like: [],
    comments: [],
  });

  // 게시글, 댓글, 좋아요 불러오기
  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(
            '*, users: user_num(user_nickname, user_profile), comments: comments(*, users: user_num(user_nickname, user_profile)),post_like(user_num)',
          )
          .eq('post_num', targetId)
          .single();
        if (error) {
          throw error;
        }
        setPost({
          post_num: data.post_num,
          title: data.post_title,
          detail: data.post_detail,
          date: data.post_date,
          category: data.post_category,
          nickname: data.users.user_nickname,
          img_url: data.post_img_url,
          user_num: data.user_num,
          post_like: data.post_like,
          comments: data.comments,
          users: data.users,
        });
        setComments(data.comments); // [{},{}]
      } catch (error) {
        console.error('포스팅에러', error);
      }
    };
    getPostAndComments();
  }, [targetId]);

  // 디테일 창 닫기
  const closeHandler = () => {
    navigate(-1);
  };

  return (
    <S.DetailContainer>
      <IconBtn size={20} onClick={closeHandler}>
        <IoIosClose />
      </IconBtn>
      <DetailHeader post={post} />
      <DetailModal post={post} setPost={setPost} targetId={targetId} />
      <DetailMain
        targetId={targetId}
        post={post}
        comments={comments}
        setComments={setComments}
      />
    </S.DetailContainer>
  );
};

export default Detail;
