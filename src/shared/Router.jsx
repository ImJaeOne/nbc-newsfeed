import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/detail/Detail';
import Post from '../pages/Post/Post';
import MyPage from '../pages/myPage/MyPage';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import Layout from '../components/Layout/Layout';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const commonRoute = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            { path: '/', element: <Home /> },
            {
              path: '/detail',
              element: <Detail />,
            },
            {
              path: '/post',
              element: <Post />,
            },
            {
              path: '/mypage',
              element: <MyPage />,
            },
          ],
        },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
      ],
    },
  ];

  const router = createBrowserRouter([...commonRoute]);
  return <RouterProvider router={router} />;
};

export default Router;
