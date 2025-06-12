import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import AppProvider from './common/store/AppContext.tsx';
import './index.css';
import Admin from './pages/Admin/Admin.tsx';
import Login from './pages/Auth/Login.tsx';
import Comment from './pages/Comment/Comment.tsx';
import CommentHide from './pages/Comment/CommentHide.tsx';
import Cookie from './pages/Cookie/Cookie.tsx';
import LinkOff from './pages/LinkOff/LinkOff.tsx';
import LinkOn from './pages/LinkOn/LinkOn.tsx';
import LinkOnHide from './pages/LinkOnHide/LinkOnHide.tsx';
import Proxy from './pages/Proxy/Proxy.tsx';
import Token from './pages/Token/Token.tsx';
import Users from './pages/Users/Users.tsx';
import LinkOffHide from './pages/LinkOffHide/LinkOnHide.tsx';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '',
        element: <Users />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/linkOn',
        element: <LinkOn />,
      },
      {
        path: '/linkOff',
        element: <LinkOff />,
      },
      {
        path: '/linkOnHide',
        element: <LinkOnHide />,
      },
      {
        path: '/linkOffHide',
        element: <LinkOffHide />,
      },
      {
        path: '/comments',
        element: <Comment />,
      },
      {
        path: '/comments-hide',
        element: <CommentHide />,
      },
      {
        path: '/cookie',
        element: <Cookie />,
      },
      {
        path: '/token',
        element: <Token />,
      },
      {
        path: '/proxy',
        element: <Proxy />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AppProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AppProvider>
  // </React.StrictMode>
)
