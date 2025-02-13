import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Post from '../pages/Post';
import MyPage from '../pages/MyPage';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Layout from '../components/Layout/Layout';

const commonRoute = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/detail', element: <Detail /> },
      { path: '/post', element: <Post /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
];

const router = createBrowserRouter([...commonRoute]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
