
import CountDown from './CountDown';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Quiz/Counter Down',
    component: CountDown,
    argTypes: {

    },
};

const Template = (args: JSX.IntrinsicAttributes & { remainingTime: number; }) => <CountDown {...args} />;

export const RenderTimer = Template.bind({});
