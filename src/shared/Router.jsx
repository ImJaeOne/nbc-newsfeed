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
