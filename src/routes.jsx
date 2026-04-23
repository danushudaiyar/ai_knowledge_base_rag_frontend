import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Documents from './pages/Documents';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/documents',
        element: <Documents />,
      },
    ],
  },
]);

export default router;
