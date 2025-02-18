import { useState, useContext } from 'react';

import { IoIosClose } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import { IconBtn } from '../../components/common/IconBtn';
import S from './detailStyle/ModalInDetail.style';

const DetailModal = ({ post, setPost, targetId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <>
      {user.num == post.user_num && (
        <>
          <IconBtn onClick={openEditModal}>수정</IconBtn>
          <IconBtn onClick={() => postDeleteHandler(targetId)}>삭제</IconBtn>
          {isModalOpen && (
            <S.ModalOverlay>
              <S.ModalContent>
                <S.ModalHeader>
                  <h3>게시물 수정</h3>
                  <S.CloseButton onClick={modalCloseHandler}>
                    <IoIosClose size="24" />
                  </S.CloseButton>
                </S.ModalHeader>
                <S.ModalBody>
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
                </S.ModalBody>
                <S.ModalFooter>
                  <button onClick={saveHandler}>저장</button>
                  <button onClick={modalCloseHandler}>취소</button>
                </S.ModalFooter>
              </S.ModalContent>
            </S.ModalOverlay>
          )}
        </>
      )}
    </>
  );
};

export default DetailModal;
