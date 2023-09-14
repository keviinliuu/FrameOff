import { Meta, StoryObj } from '@storybook/react';
import GeneralButton from '../components/atoms/GeneralButton';

const meta: Meta<typeof GeneralButton> = {
    component: GeneralButton,
};

export default meta;

type Story = StoryObj<typeof GeneralButton>;

export const Main: Story = {
    args: {
        children: 'Hello there',
        textColor: 'text-midnight',
        bgColor: 'bg-blush',
        onClick: () => console.log('clicked'),
    },
};
