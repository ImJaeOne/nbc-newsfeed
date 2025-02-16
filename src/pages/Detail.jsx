import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { theme } from '../style/theme';
import { IoIosMore } from 'react-icons/io';

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const targetId = queryParams.get('post_id');

  const navigate = useNavigate();

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [post, setPost] = useState({
    title: '',
    detail: '',
    date: '',
    category: '',
    nickname: '',
    img_url: '',
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
          img_url: data.post_img_url,
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
      setComments((prev) =>
        prev.filter((comment) => comment.comment_num !== commentId),
      );
      alert('댓글이 삭제되었습니다.');
    }
  };

  // // 현재 오류
  // const postDeleteHandler = async (targetId) => {
  //   if (!window.confirm('이 게시물을 삭제하시겠습니까?')) return;

  //   const { error } = await supabase
  //     .from('posts')
  //     .delete()
  //     .eq('post_num', targetId);

  //   if (error) {
  //     console.error(error);
  //   } else {
  //     setPost({
  //       title: '',
  //       detail: '',
  //       date: '',
  //       category: '',
  //       nickname: '',
  //       url: '',
  //     });
  //     navigate('/');
  //   }
  // };

  const postingChangeHandler = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert('제목과 내용 모두 입력해 주세요.');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .update({
        post_title: editedTitle,
        post_detail: editedContent,
        post_date: new Date().toISOString(),
      })
      .eq('post_num', targetId);

    if (error) {
      console.error('수정에러', error);
    } else {
      alert('수정성공');
      setPost((prev) => ({
        ...prev,
        title: editedTitle,
        detail: editedContent,
      }));
      setIsEditing(false);
    }
  };

  const { title, detail, category, nickname, img_url } = post;

  return (
    <StDetailContainer>
      <StHeaderInDetail>
        <StTitleContainer>
          <StBadge>{category}</StBadge>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              placeholder="제목"
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <>{title}</>
          )}
        </StTitleContainer>
        <IoIosMore />
        {user.num == post.user_num && (
          <>
            {isEditing ? (
              <>
                <button onClick={postingChangeHandler}>완료</button>
                <button onClick={() => setIsEditing(false)}>취소</button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditedTitle(post.title);
                    setEditedContent(post.detail);
                    setIsEditing(true);
                  }}
                >
                  수정
                </button>
                {/* <button onClick={() => postDeleteHandler(targetId)}>
                  삭제
                </button> */}
              </>
            )}
          </>
        )}
      </StHeaderInDetail>
      <StMainContent>
        <StPhotoBox>
          <img src={img_url} alt="사진" />
        </StPhotoBox>
        <StContentBox>
          <StPostContent>
            <StUserInfo>
              <StImageField />
              {nickname}
            </StUserInfo>
            <p>{detail}</p>
            {isEditing ? (
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              ''
            )}
          </StPostContent>
          <StCommentListContainer>
            {comments.map((comment) => {
              return (
                <div key={comment.comment_num}>
                  <div>
                    <StImageField />
                    <StUserInfo>{comment.users.user_nickname}</StUserInfo>
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
          </StCommentListContainer>
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

const StCommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }

  &::-webkit-scrollbar-track {
    background-color: gray;
  }
`;

const StDetailContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.nav_background_color};
  border-radius: 30px;
`;

const StHeaderInDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: blue; */
  padding: 10px 20px;
  color: #424242
  /* color: white; */
  border-radius: 30px;
  margin-bottom: 0px;
  box-sizing: border-box;
`;

const StTitleContainer = styled.div`
  box-sizing: border-box;
  font-weight: bold;
  font-size: 20px;
`;

const StUserInfo = styled.div`
  /* margin-top: 7px; */
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
  gap: 5px;
`;

const StImageField = styled.div`
  width: 21px;
  height: 21px;
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
  height: 100%;
  gap: 20px;
`;

const StPhotoBox = styled.div`
  /* flex: 1; */
  width: 50%;
  max-height: 534px;
  /* background-color: #fff; */
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
  }
`;

const StContentBox = styled.div`
  /* flex: 1; */
  display: flex;
  width: 50%;
  min-height: 100%;
  max-height: 534px;
  box-sizing: border-box;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
`;

const StPostContent = styled.div`
  /* flex: 1; */
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  min-height: 60px;
`;

const StCommentBox = styled.div`
  /* flex: 1; */
  background-color: #f3f3f3;
  border-radius: 30px;
  padding: 15px;
  margin-top: auto;
  box-sizing: border-box;
`;
