import type { Meta, StoryObj } from '@storybook/react';

import ViewPoll from '../pages/ViewPoll';

const meta: Meta<typeof ViewPoll> = {
    component: ViewPoll,
};

export default meta;

type Story = StoryObj<typeof ViewPoll>;

export const Main: Story = {
    render: () => (
        <div className='h-screen'>
            <div className='w-1/2 h-1/2'>
                <ViewPoll />
            </div>
        </div>
    ),
};
