
import MovieCard from './MovieCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Quiz/MovieCard',
    component: MovieCard,
    argTypes: {
        //quiz: { createQuiz: Quiz }
    },
};
const Template = (args: JSX.IntrinsicAttributes) => <MovieCard quiz={{
    createQuiz: {
        __typename: undefined,
        actorName: '',
        actorPicture: '',
        adult: false,
        createdAt: '',
        id: 0,
        movieDescription: '',
        movieTitle: '',
        movieUrl: '',
        originalName: '',
        quizType: false,
        releaseDate: '',
        round: {
            __typename: undefined,
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

export const Movie = Template.bind({});
