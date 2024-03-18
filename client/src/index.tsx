import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import SharePoll from './pages/SharePoll';
import Error from './pages/Error';
import axios from 'axios';
import './index.css';
import VotePoll from './pages/VotePoll';

axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}/api/`;

if(import.meta.env.NODE_ENV === 'prod') {
    disableReactDevTools();
}

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
        path: 'poll/:_id',
        element: <VotePoll />,
    },
    {
        path: 'share',
        element: <SharePoll />,
    },
    {
        path: 'error',
        element: <Error />,
    },
    {
        path: '*',
        element: <Error />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
