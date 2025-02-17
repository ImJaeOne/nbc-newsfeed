import { AuthContext } from '../contexts/AuthProvider';
import { supabase } from '../supabase/client';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconBtn } from '../components/common/IconBtn';
import { IoIosClose } from 'react-icons/io';
import S from '../style/Detail/Deail.style';
import Header from '../components/Detail/Header';
import Modal from '../components/Detail/Modal';
import CocaCola from '../components/Detail/CocaCola';

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const targetId = queryParams.get('post_id');

  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  // const { user } = useContext(AuthContext);

  const [post, setPost] = useState({
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
            '*, users: user_num(user_nickname), comments: comments(*, users: user_num(user_nickname)),post_like(user_num)',
          )
          .eq('post_num', targetId)
          .single();
        // data.comments => [{},{},{}]

        if (error) {
          throw error;
        }
        setPost({
          title: data.post_title,
          detail: data.post_detail,
          date: data.post_date,
          category: data.post_category,
          nickname: data.users.user_nickname,
          img_url: data.post_img_url,
          user_num: data.user_num,
          post_like: data.post_like,
          comments: data.comments,
        });
        setComments(data.comments); // [{},{}]
      } catch (error) {
        console.error('포스팅에러', error);
      }
    };
    getPostAndComments();
  }, [targetId]);

  console.log(post);

  // 디테일 창 닫기
  const closeHandler = () => {
    navigate(-1);
  };

  return (
    <S.DetailContainer>
      <IconBtn onClick={closeHandler}>
        <IoIosClose />
      </IconBtn>
      <Header post={post} />
      <Modal post={post} setPost={setPost} targetId={targetId} />

      <CocaCola
        targetId={targetId}
        post={post}
        comments={comments}
        setComments={setComments}
      />
    </S.DetailContainer>
  );
};

export default Detail;
