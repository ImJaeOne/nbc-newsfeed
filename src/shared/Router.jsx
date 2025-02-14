import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Post from '../pages/Post';
import MyPage from '../pages/MyPage';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Layout from '../components/Layout/Layout';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const Router = () => {
  const { isLogin } = useContext(AuthContext);

  const commonRoute = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: isLogin ? <Home /> : <Navigate to="/login" /> },
        {
          path: '/detail',
          element: isLogin ? <Detail /> : <Navigate to="/login" />,
        },
        {
          path: '/post',
          element: isLogin ? <Post /> : <Navigate to="/login" />,
        },
        {
          path: '/mypage',
          element: isLogin ? <MyPage /> : <Navigate to="/login" />,
        },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
      ],
    },
  ];
  console.log(commonRoute);

  const router = createBrowserRouter([...commonRoute]);
  return <RouterProvider router={router} />;
};

export default Router;
