
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
        actorName: 'Show Lewis',
        actorPicture: 'http://image.tmdb.org/t/p/w500//kQh7U7kRLF9NKEMpxiGjZEIu0o3.jpg',
        adult: false,
        createdAt: '',
        id: 0,
        movieDescription: '',
        movieTitle: 'Avatar',
        movieUrl: 'http://image.tmdb.org/t/p/w500//kQh7U7kRLF9NKEMpxiGjZEIu0o3.jpg',
        originalName: 'Lewis',
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
