import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round, Quiz } from "../entities";
import axios from "axios";

@Resolver()
export class roundResolver {
    @Mutation(() => Round)
    async createRound(): Promise<Round | Round[] | Quiz[] | undefined> {
        const round = await Round.create({ score: 0 }).save();
        let movies: any[] = []
        let quizzes: any[] = []
        try {
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=f797a48d40f189b038093795534b113b")
            movies = response?.data?.results
        } catch {
            return
        }

        movies.map(
            (movie) => quizzes.push(
                {
                    round: round.publicId,
                    adult: movie.adult,
                    actorName: " ",
                    originalName: " ",
                    actorPicture: " ",
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500/" + movie.poster_path,
                }
            )
        );
        Quiz.save(quizzes.splice(0, 20))
        return Round.findOne(round.publicId, { relations: ['quiz'] })
    }

    @Query(() => Round, { nullable: true })
    async getRoundById(
        @Arg("publicId") publicId: string,
    ): Promise<Round | undefined> {
        return Round.findOne(publicId, { relations: ['quiz'] });
    }

    @Mutation(() => Round)
    async updateScore(
        @Arg("publicId") publicId: string,
        @Arg("score") score: number
    ): Promise<Round | undefined | { error: string, status: number }> {
        const round = await Round.findOne({ where: { publicId: publicId } })
        if (round) {
            await Round.update(publicId, { score: round.score + score })
            return round
        }


        return { error: "an error", status: 404 }

    }
}
