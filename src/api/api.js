import { supabase } from '../supabase/client';

export const fetchPostsData = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `*, users: user_num(user_nickname, user_profile), post_like(user_num),comments(post_num)`,
      )
      .order('post_date', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
