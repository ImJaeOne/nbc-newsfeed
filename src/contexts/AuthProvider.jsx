import { useState, useEffect, createContext } from 'react';
import { supabase } from '../supabase/client';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({ num: null, nickname: '', intro: '' });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser((prev) => ({ ...prev, num: session.user.id }));
        setIsLogin(true);
      } else {
        setUser({ num: null, nickname: '' });
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
        .select('user_nickname, user_intro')
        .eq('user_num', user.num)
        .single();

      if (error) {
        console.error(error);
      } else {
        setUser((prev) => ({
          ...prev,
          nickname: userData.user_nickname,
          intro: userData.user_intro,
        }));
      }
    };

    if (isLogin) {
      getAdditionalUserInfo();
    }
  }, [isLogin, user.num]);

  return (
    <AuthContext.Provider value={{ isLogin, user, setIsLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
