import type { Meta, StoryObj } from '@storybook/react';

import ViewPoll from '../components/voting/ViewSlides';

const meta: Meta<typeof ViewPoll> = {
    component: ViewPoll,
};

export default meta;

type Story = StoryObj<typeof ViewPoll>;

export const Main: Story = {
    render: () => (
        <div className='h-screen'>
            <ViewPoll _id='JPNvoVRn' />
        </div>
    ),
};
