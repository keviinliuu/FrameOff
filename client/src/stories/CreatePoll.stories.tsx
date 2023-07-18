import type { Meta, StoryObj } from '@storybook/react';

import CreatePoll from '../pages/CreatePoll';

const meta: Meta<typeof CreatePoll> = {
    component: CreatePoll,
};

export default meta;

type Story = StoryObj<typeof CreatePoll>;

export const Main: Story = {
    render: () => (
        <div className='h-screen'>
            <div className='w-1/2 h-1/2'>
                <CreatePoll />
            </div>
        </div>
    ),
};
