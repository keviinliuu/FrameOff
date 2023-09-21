import type { Meta, StoryObj } from '@storybook/react';

import Popup from '../components/Popup';

const meta: Meta<typeof Popup> = {
    component: Popup,
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const Main: Story = {
    render: () => (
        <div className='flex h-screen'>
            <Popup />
        </div>
    ),
};
