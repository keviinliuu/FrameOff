import { Meta, StoryObj } from '@storybook/react';
import GeneralButton from '../components/GeneralButton';


const meta: Meta<typeof GeneralButton> = {
  component: GeneralButton,
};

export default meta;

type Story = StoryObj<typeof GeneralButton>;

export const Main: Story = {
    args: {
        children: "Hello",
        textColor: "midnight",
        bgColor: "blush",
        onClick: () => console.log('clicked'),
    }
}