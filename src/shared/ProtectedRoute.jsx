import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLogin } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (isLogin !== 'initial') {
    if (!isLogin) {
      return (
        <Navigate to="/login" replace state={{ redirectedFrom: pathname }} />
      );
    }
  } else {
    return <h1> 바보~~~</h1>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
