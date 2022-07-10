
import PlayingComponent from './PlayingComponent';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Game/PlayingComponent',
    component: PlayingComponent,
    argTypes: {
        //quiz: { createQuiz: Quiz }
    },
};
const Template = (args: JSX.IntrinsicAttributes & { quiz: { createQuiz: Quiz; }; }) => <PlayingComponent setStep={function (): void {
    throw new Error('Function not implemented.');
} } setNumberQuiz={function (): void {
    throw new Error('Function not implemented.');
} } round={{
    __typename: undefined,
    createdAt: '',
    publicId: '',
    quiz: [],
    roundType: '',
    score: 0,
    updatedAt: ''
}} numberQuiz={0} {...args} />;

export const Playing = Template.bind({});

