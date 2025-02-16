import { useState, useEffect, createContext } from 'react';
import { supabase } from '../supabase/client';

export const AuthContext = createContext(false);

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState('initial');
  const [user, setUser] = useState({
    num: null,
    nickname: '',
    intro: '',
    profile: '',
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser((prev) => ({ ...prev, num: session.user.id }));
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const getAdditionalUserInfo = async () => {
      if (!user.num) return;

      const { data: userData, error } = await supabase
        .from('users')
        .select('user_nickname, user_intro, user_profile')
        .eq('user_num', user.num)
        .single();
      if (error) {
        console.error(error);
      } else {
        setUser((prev) => ({
          ...prev,
          nickname: userData.user_nickname,
          intro: userData.user_intro,
          profile: userData.user_profile,
        }));
      }
    };
    if (isLogin) {
      getAdditionalUserInfo();
    }
  }, [isLogin, user.id]);

  return (
    <AuthContext.Provider value={{ isLogin, user, setIsLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
