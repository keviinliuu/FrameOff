import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import SharePoll from './pages/SharePoll';
import Error from './pages/Error';
import axios from 'axios';
import './index.css';
import VotePoll from './pages/VotePoll';

axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}/api/`;

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'create',
        element: <CreatePoll />,
    },
    {
        path: ':_id',
        element: <VotePoll />,
        errorElement: <Error />,
    },
    {
        path: 'share',
        element: <SharePoll />,
    },
    {
        path: 'error',
        element: <Error />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
