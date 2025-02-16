import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const targetId = queryParams.get('post_id');

  const navigate = useNavigate();

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState({
    title: '',
    detail: '',
    date: '',
    category: '',
    nickname: '',
    url: '',
    user_num: '',
  });

  useEffect(() => {
    const getPostAndComments = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(
          '*, users: user_num(user_nickname), comments: comments(*, users: user_num(user_nickname))',
        )
        .eq('post_num', targetId)
        .single();
      // data.comments => [{},{},{}]
      if (error) {
        console.error('포스팅에러', error);
      } else {
        setPost({
          title: data.post_title,
          detail: data.post_detail,
          date: data.post_date,
          category: data.post_category,
          nickname: data.users.user_nickname,
          url: data.post_img_url,
          user_num: data.user_num,
        });
        setComments(data.comments); // [{},{} ]
      }
    };
    getPostAndComments();
  }, []);

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('댓글을 입력해 주세요.');
      setNewComment('');
      return;
    }
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_num: targetId,
        comment_content: newComment,
        user_num: user.num,
      })
      .select('*, users: user_num(user_nickname)');
    if (error) {
      console.error(error);
    }

    alert('게시성공');
    setComments((prev) => [...prev, ...data]);
    setNewComment('');
  };

  const commetDeleteHandler = async (commentId) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('comment_num', commentId);

    if (error) {
      console.error(error);
    } else {
      setComments((prev) => prev.filter((c) => c.comment_num !== commentId));
      alert('댓글이 삭제되었습니다.');
    }
  };

  const postDeleteHandler = async (targetId) => {
    if (!window.confirm('이 게시물을 삭제하시겠습니까?')) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('post_num', targetId);

    if (error) {
      console.error(error);
    } else {
      setPost({
        title: '',
        detail: '',
        date: '',
        category: '',
        nickname: '',
        url: '',
      });
      navigate('/');
    }
  };

  const { title, detail, category, nickname, url } = post;

  return (
    <StDetailContainer>
      <StHeaderInDetail>
        <div>
          <StBadge>{category}</StBadge>
          {title}
        </div>
        <StUserInfo>
          <StImageField />
          <div>{nickname}</div>
        </StUserInfo>
        <span>수정</span>
        {user.num == post.user_num && (
          <button onClick={() => postDeleteHandler(targetId)}>삭제</button>
        )}
      </StHeaderInDetail>
      <StMainContent>
        <StPhotoBox>
          <img src={url} alt="사진" />
        </StPhotoBox>
        <StContentBox>
          <StPostContent>
            <p>{detail}</p>
          </StPostContent>
          <div>댓글영역</div>
          {comments.map((comment) => {
            return (
              <div key={comment.comment_num}>
                <div>
                  <div>{comment.users.user_nickname}</div>
                  <div>{comment.comment_content}</div>
                  {comment.user_num == user.num && (
                    <button
                      onClick={() => commetDeleteHandler(comment.comment_num)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <StCommentBox>
            <form onSubmit={commentSubmitHandler}>
              <div>
                <span>좋아요 |</span>
                <span> 코멘트</span>
              </div>
              <div>좋아요 갯수</div>
              <input
                name="comment_content"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                placeholder="댓글 달기..."
              />
              <button type="submit">게시</button>
            </form>
          </StCommentBox>
        </StContentBox>
      </StMainContent>
    </StDetailContainer>
  );
};

export default Detail;

const StDetailContainer = styled.div`
  width: 100%;
  min-height: 70vh;
  max-width: 900px;
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

const StBadge = styled.span`
  background-color: green;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  margin-right: 5px;
`;

const StMainContent = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const StPhotoBox = styled.div`
  flex: 1;
  background-color: lightgray;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 30px;
  }
`;

const StContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
`;

const StPostContent = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const StCommentBox = styled.div`
  flex: 1;
  background-color: #f3f3f3;
  border-radius: 30px;
  padding: 15px;
`;
