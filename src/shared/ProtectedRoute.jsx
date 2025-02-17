import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOGIN_STATUS } from '../constants/login';

const ProtectedRoute = () => {
  const { isLogin } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (isLogin !== LOGIN_STATUS.UNAUTHORIZED) {
    switch (isLogin) {
      case LOGIN_STATUS.UNAUTHORIZED:
      case LOGIN_STATUS.LOGGED_OUT: // 로그아웃 상태도 로그인 페이지로 이동
        return (
          <Navigate to="/login" replace state={{ redirectedFrom: pathname }} />
        );

      case LOGIN_STATUS.LOGGED_IN:
        return <Outlet />;

      default:
        // 예기치 못한 상태일 경우 안전한 기본 처리
        return <Navigate to="/login" replace />;
    }
  }
};

export default ProtectedRoute;
