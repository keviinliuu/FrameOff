import type { Meta, StoryObj } from '@storybook/react';

import PollInfo from '../components/creation/PollInfo';

const meta: Meta<typeof PollInfo> = {
    component: PollInfo,
};

export default meta;

type Story = StoryObj<typeof PollInfo>;

export const Main: Story = {
    render: () => (
        <div className='flex h-screen'>
            <PollInfo handleTitle={() => ''} handleDescription={() => ''} />
        </div>
    ),
};
