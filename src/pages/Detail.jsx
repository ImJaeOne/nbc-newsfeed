import { AuthContext } from '../contexts/AuthProvider';
import { supabase } from '../supabase/client';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../style/theme';
import { IoIosMore } from 'react-icons/io';
import { IconBtn } from '../components/common/IconBtn';
import { IoIosClose } from 'react-icons/io';
import { CategoryBadge } from '../components/common/CategoryBadge';

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
    img_url: '',
    user_num: '',
  });

  // 게시글 및 댓글 불러오기
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
        setComments(data.comments); // [{},{}]
      }
    };
    getPostAndComments();
  }, []);

  // 게시물 수정 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  // 게시물 수정 모달 관련
  const openEditModal = () => {
    setModalTitle(post.title);
    setModalContent(post.detail);
    setIsModalOpen(true);
  };
  // 게시물 수정 모달 관련
  const saveHandler = async () => {
    if (!modalTitle.trim() || !modalContent.trim()) {
      alert('제목과 내용 모두 입력해 주세요.');
      return;
    }

    const { editError } = await supabase
      .from('posts')
      .update({
        post_title: modalTitle,
        post_detail: modalContent,
      })
      .eq('post_num', targetId);

    if (editError) {
      console.error('게시물 수정 에러', editError);
    }

    setPost((prev) => ({
      ...prev,
      title: modalTitle,
      detail: modalContent,
    }));

    alert('게시물 수정 완료');
    setIsModalOpen(false);
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  // 코멘트 입력
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

  // 코멘트 삭제
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

  // 포스팅 삭제
  const postDeleteHandler = async (targetId) => {
    if (!window.confirm('이 게시물을 삭제하시겠습니까?')) return;

    const { commentsError } = await supabase
      .from('comments')
      .delete()
      .eq('post_num', targetId);

    if (commentsError) {
      console.error('포스팅삭제전 댓글삭제실패', commentsError);
    }

    const { postError } = await supabase
      .from('posts')
      .delete()
      .eq('post_num', targetId);

    if (postError) {
      console.error('포스팅삭제실패', postError);
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

  // 디테일 창 닫기
  const closeHandler = () => {
    navigate(-1);
  };

  const { title, detail, category, nickname, img_url } = post;

  return (
    <StDetailContainer>
      <IconBtn onClick={closeHandler}>
        <IoIosClose />
      </IconBtn>
      <StHeaderInDetail>
        <StTitleContainer>
          <CategoryBadge category={category} />
          {title}
        </StTitleContainer>
        <IoIosMore />
        {user.num == post.user_num && (
          <>
            <IconBtn onClick={openEditModal}>수정</IconBtn>
            <IconBtn onClick={() => postDeleteHandler(targetId)}>삭제</IconBtn>
            {isModalOpen && (
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>
                    <h3>게시물 수정</h3>
                    <CloseButton onClick={modalCloseHandler}>
                      <IoIosClose size="24" />
                    </CloseButton>
                  </ModalHeader>
                  <ModalBody>
                    <label>제목</label>
                    <input
                      type="text"
                      value={modalTitle}
                      onChange={(e) => setModalTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                    />
                    <label>내용</label>
                    <textarea
                      value={modalContent}
                      onChange={(e) => setModalContent(e.target.value)}
                      placeholder="내용을 입력하세요"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <button onClick={saveHandler}>저장</button>
                    <button onClick={modalCloseHandler}>취소</button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
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
                <span>좋아요</span>
                <span>코멘트</span>
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
  box-sizing: border-box;
`;

const StHeaderInDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: blue; */
  /* color: white; */
  padding: 10px 20px;
  color: #424242;
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
  box-sizing: border-box;
`;

const StMainContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  box-sizing: border-box;
`;

const StPhotoBox = styled.div`
  width: 50%;
  max-height: 534px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
  }
`;

const StContentBox = styled.div`
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
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  min-height: 60px;
`;

const StCommentBox = styled.div`
  background-color: #f3f3f3;
  border-radius: 30px;
  padding: 15px;
  margin-top: auto;
  box-sizing: border-box;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const ModalBody = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input,
  textarea {
    width: 95%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:first-child {
    background-color: #f2c450;
    color: white;
    transition: background 0.3s;

    &:hover {
      background-color: #f2c950;
    }
  }

  button:last-child {
    background-color: ${({ theme }) => theme.colors.haeder_text_color};
    color: white;
    transition: background 0.3s;

    &:hover {
      background-color: #f25151;
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
