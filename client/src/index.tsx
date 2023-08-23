import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import ViewPoll from './pages/ViewPoll';
import Error from './pages/Error';
import axios from 'axios';
import './index.css';

axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}/api/`;

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: 'create',
        element: <CreatePoll />,
    },
    {
        path: ':_id',
        element: <ViewPoll />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
