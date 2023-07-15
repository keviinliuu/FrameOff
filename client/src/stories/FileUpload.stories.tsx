import type { Meta, StoryObj } from '@storybook/react';

import FileUpload from '../components/FileUpload';

const meta: Meta<typeof FileUpload> = {
    component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Main: Story = {
    render: () => (
        <div className='h-screen'>
            <div className='w-1/2 h-1/2'>
                <FileUpload />
            </div>
        </div>
    ),
};

export const Secondary: Story = {
    render: () => (
        <div className='h-screen'>
            <FileUpload />
        </div>
    ),
};
