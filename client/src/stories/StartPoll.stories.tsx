import type { Meta, StoryObj } from '@storybook/react';

import StartPoll from '../components/voting/StartPoll';

const meta: Meta<typeof StartPoll> = {
    component: StartPoll,
};

export default meta;

type Story = StoryObj<typeof StartPoll>;

export const Main: Story = {
    render: () => (
        <div className='flex h-screen'>
            <StartPoll />
        </div>
    ),
};
