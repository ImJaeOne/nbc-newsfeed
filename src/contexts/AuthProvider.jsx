import { useState, useEffect, createContext } from 'react';
import { supabase } from '../supabase/client';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        setIsLogin(!!session);
      },
    );

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin }}>{children}</AuthContext.Provider>
  );
}
