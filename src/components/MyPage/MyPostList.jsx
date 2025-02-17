import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import { getTimeAgo } from '../../utils/dateUtils';
import MyPost from './MyPost';
import { MdExpandMore } from 'react-icons/md';
import S from '../../style/MyPage/MyPostList.style';
import { IconBtn } from '../common/IconBtn';

const MyPostList = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(4);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(
            '*,  users: user_num(user_nickname), post_like(post_num), comments(post_num)',
          )
          .eq('user_num', user.num)
          .order('post_date', { ascending: false })
          .limit(currentPage);

        const sortedMyPosts = data.map((post) => ({
          ...post,
          post_date: getTimeAgo(post.post_date),
        }));

        setMyPosts(sortedMyPosts);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, [currentPage]);

  const handlePageCount = () => {
    setCurrentPage(currentPage + 4);
  };

  return (
    <S.PostListDashboard>
      <S.MyPostListContainer>
        {myPosts.map((post) => {
          return <MyPost post={post} key={post.post_num} />;
        })}
      </S.MyPostListContainer>
      <IconBtn onClick={handlePageCount}>
        <MdExpandMore size={50} />
      </IconBtn>
    </S.PostListDashboard>
  );
};

export default MyPostList;
