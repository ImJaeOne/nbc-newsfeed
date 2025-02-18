import { useState, useEffect, useContext, useRef } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import { getTimeAgo } from '../../utils/dateUtils';
import S from './myPageStyle/MyPostList.style';
import { IconBtn } from '../../components/common/IconBtn';
import MyPost from './MyPost';

const LIMIT = 8;

const MyPostList = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(LIMIT);
  const [isOpen, setIsOpen] = useState(true);
  const postsLength = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 post의 전체 길이를 받아오는 함수
    const fetchTotalLength = async () => {
      try {
        const { count, error } = await supabase
          .from('posts')
          .select('post_num', { count: 'exact', head: true })
          .eq('user_num', user.num);

        if (error) {
          throw error;
        }

        postsLength.current = count;
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotalLength();
  }, []);

  useEffect(() => {
    // Supabase에서 posts 테이블의 데이터를 가져오는 함수
    // 한번에 8개씩 불러옴
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

  // 더보기 버튼을 눌렀을 때
  // 다음 나올 페이지가 전체 포스트의 개수보다 크면 더보기 버튼이 사라지게 만듦
  // 아닐 시 다음 페이지가 나오게
  const handlePageCount = () => {
    let newPage = currentPage + LIMIT;
    if (newPage >= postsLength.current) {
      newPage = postsLength.current;
      setIsOpen(false);
    }
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchdaechoong = async () => {
      const { data, error } = await supabase
        .from('post_like')
        .select('*, posts: post_num(*)')
        .eq('user_num', user.num);
      console.log(data, error);
    };
    fetchdaechoong();
  }, []);
  return (
    <S.PostListDashboard>
      <S.MyPostListContainer>
        {myPosts.map((post) => {
          return <MyPost post={post} key={post.post_num} />;
        })}
      </S.MyPostListContainer>
      {isOpen && (
        <IconBtn onClick={handlePageCount}>
          <S.MoreText>더보기</S.MoreText>
          <MdExpandMore size={30} color="#666" />
        </IconBtn>
      )}
    </S.PostListDashboard>
  );
};

export default MyPostList;
