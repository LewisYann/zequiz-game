
import { Quiz } from '../../generated/graphql';
import ActorCard from './ActorCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Quiz/Actor Card',
    component: ActorCard,
    argTypes: {
        quiz: {
            createQuiz: {
                id: 1,
                round: {
                    publicId: "06b25c5f-fc2a-4b82-ab86-b76ca417d3bb",
                    updatedAt: "1657450937393",
                    score: 0,
                    roundType: "unlimited",
                },
                adult: false,
                actorName: "Sound Re-Recording Mixer",
                originalName: "Walter Murch",
                actorPicture: "http://image.tmdb.org/t/p/w500//kQh7U7kRLF9NKEMpxiGjZEIu0o3.jpg",
                movieTitle: "The Godfather: Part II",
                movieDescription: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
                releaseDate: "1974-12-20",
                movieUrl: "http://image.tmdb.org/t/p/w500//hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
                quizType: false,
                createdAt: "1657450939783",
                updatedAt: "1657450939783"
            }
        }
    },
};
const Template = (args: JSX.IntrinsicAttributes & { quiz: { createQuiz: Quiz; }; }) => <ActorCard {...args} />;

export const Actor = Template.bind({});
