const { data, error } = await supabase
  .from('post_like')
  .select('*, posts: post_num(*)')
  .eq('user_num', user.num);
