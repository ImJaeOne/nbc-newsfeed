import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import { getTimeAgo } from '../../utils/dateUtils';
import MyPost from './MyPost';
import S from '../../style/MyPage/MyPostList.style';

const MyPostList = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(
            '*,  users: user_num(user_nickname), post_like(post_num), comments(post_num)',
          )
          .eq('user_num', user.num)
          .order('post_date', { ascending: false });
        console.log(data);
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
  }, []);

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
    </S.PostListDashboard>
  );
};

export default MyPostList;
