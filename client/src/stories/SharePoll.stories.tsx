import type { Meta, StoryObj } from '@storybook/react';

import SharePoll from '../pages/SharePoll';

const meta: Meta<typeof SharePoll> = {
    component: SharePoll,
};

export default meta;

type Story = StoryObj<typeof SharePoll>;

export const Main: Story = {
    render: () => (
        <div className='h-screen'>
            <SharePoll />
        </div>
    ),
};
