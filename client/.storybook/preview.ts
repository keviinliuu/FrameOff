import type { Preview } from '@storybook/react';
import '../src/index.css';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

axios.defaults.baseURL = process.env.STORYBOOK_PORT ? `http://localhost:${process.env.STORYBOOK_PORT}/api` : 'http://localhost:8080/api';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
