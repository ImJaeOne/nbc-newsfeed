import { supabase } from '../supabase/client';

export const fetchPostsData = async (category) => {
  try {
    let query = supabase
      .from('posts')
      .select(
        `*, users: user_num(user_nickname, user_profile), post_like(user_num), comments(post_num)`,
      )
      .order('post_date', { ascending: false });

    if (category !== '전체') {
      query = query.eq('post_category', category);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
