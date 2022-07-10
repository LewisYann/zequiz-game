
import QuizCard from './QuizCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Quiz/QuizCard',
    component: QuizCard,
    argTypes: {
        //quiz: { createQuiz: Quiz }
    },
};

const Template = (args: JSX.IntrinsicAttributes) => <QuizCard quiz={{
    createQuiz: {
        actorName: 'Show Lewis',
        actorPicture: '',
        adult: false,
        createdAt: '',
        id: 0,
        movieDescription: '',
        movieTitle: 'Avatar',
        movieUrl: '',
        originalName: 'Lewis',
        quizType: false,
        releaseDate: '',
        round: {
            createdAt: '',
            publicId: '',
            quiz: [],
            roundType: '',
            score: 0,
            updatedAt: ''
        },
        updatedAt: ''
    }
}} {...args} />;

export const Actor = Template.bind({});
