import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOGIN_STATUS } from '../constants/login';
import Loading from '../components/common/Loading';

const ProtectedRoute = () => {
  const { isLogin } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (isLogin !== LOGIN_STATUS.UNAUTHORIZED) {
    if (isLogin === LOGIN_STATUS.LOGGED_IN) {
      return <Outlet />;
    }

    if (isLogin === LOGIN_STATUS.LOGGED_OUT) {
      return (
        <Navigate to="/login" replace state={{ redirectedFrom: pathname }} />
      );
    }
  } else {
    return <Loading />;
  }
};

export default ProtectedRoute;
