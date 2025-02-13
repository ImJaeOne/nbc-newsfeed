import { useState, useEffect, createContext } from 'react';
import { supabase } from '../supabase/client';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({ id: null, nickname: '' });

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        if (session?.user) {
          setUser((prev) => ({ ...prev, id: session.user.id }));
          setIsLogin(true);
        } else {
          setUser({ id: null, nickname: '' });
          setIsLogin(false);
        }
      },
    );
    console.log(user);

    // return () => {
    //   subscription?.unsubscribe();
    // };
  }, []);

  useEffect(() => {
    const getAdditionalUserInfo = async () => {
      if (!user.id) return;

      const { data: userData, error } = await supabase
        .from('users')
        .select('user_nickname')
        .eq('user_num', user.id);

      if (error) {
        console.error(error);
      } else {
        setUser((prev) => ({ ...prev, nickname: userData.user_nickname }));
        console.log(userData);
      }
    };

    if (isLogin) {
      getAdditionalUserInfo();
    }
  }, [isLogin, user.id]);

  return (
    <AuthContext.Provider value={{ isLogin, user, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
