import '../src/index.css';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.STORYBOOK_PORT ? `http://localhost:${import.meta.env.STORYBOOK_PORT}/api` : 'http://localhost:8080/api';

/** @type { import('@storybook/react').Preview } */
const preview = {
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
