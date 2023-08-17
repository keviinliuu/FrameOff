import type { Meta, StoryObj } from '@storybook/react';

import LandingPoll from '../pages/LandingPoll';

const meta: Meta<typeof LandingPoll> = {
    component: LandingPoll,
};

export default meta;

type Story = StoryObj<typeof LandingPoll>;

export const Main: Story = {
    render: () => (
        <div className='flex h-screen'>
            <LandingPoll />
        </div>
    ),
};
