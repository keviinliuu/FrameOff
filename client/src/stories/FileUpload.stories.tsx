import type { Meta, StoryObj } from '@storybook/react';

import FileUpload from '../components/FileUpload';

const meta: Meta<typeof FileUpload> = {
    component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Main: Story = {
    render: () => <FileUpload />,
};
