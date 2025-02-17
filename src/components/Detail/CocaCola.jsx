import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import { useState, useContext } from 'react';
import React from 'react';
import LikeBtn from '../common/LikeBtn';
import CommentBtn from '../common/CommentBtn';
import S from '../../style/Detail/MainInDetail.style';
import UserProfile from '../common/UserProfile';

const CocaCola = ({ targetId, post, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

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
  const commentDeleteHandler = async (commentId) => {
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

  const { detail, nickname, img_url } = post;

  return (
    <S.MainContent>
      <S.PhotoBox>
        <img src={img_url} alt="사진" />
      </S.PhotoBox>
      <S.ContentBox>
        <S.PostContent>
          <S.UserInfo>
            <UserProfile size="20px" src={user.profile} />
            {nickname}
          </S.UserInfo>
          <p>{detail}</p>
        </S.PostContent>
        <S.CommentListContainer>
          {comments.map((comment) => {
            return (
              <div key={comment.comment_num}>
                <div>
                  <S.ImageField />
                  <S.UserInfo>{comment.users.user_nickname}</S.UserInfo>
                  <div>{comment.comment_content}</div>
                  {comment.user_num == user.num && (
                    <button
                      onClick={() => commentDeleteHandler(comment.comment_num)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </S.CommentListContainer>
        <S.CommentBox>
          <span>
            <LikeBtn user={user} post={post} size={15} able={true} />
          </span>
          <span>
            <CommentBtn post={post} size={15} />
          </span>
          <form onSubmit={commentSubmitHandler}>
            <input
              name="comment_content"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="댓글 달기..."
              style={{ width: '350px' }}
            />
            <button type="submit" style={{}}>
              게시
            </button>
          </form>
        </S.CommentBox>
      </S.ContentBox>
    </S.MainContent>
  );
};

export default CocaCola;
