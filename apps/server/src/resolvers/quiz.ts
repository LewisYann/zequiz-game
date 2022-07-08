import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round, Quiz } from "../entities";
import axios from "axios";


async function getMoviesDetails(movieId: number, roundType: any, type?: boolean) {
    const response = await axios.get("https://api.themoviedb.org/3/movie/" + movieId.toString() + "/credits?api_key=f797a48d40f189b038093795534b113b")
    const data: any = response?.data

    if (roundType === "unlimited" || typeof type == "undefined") {
        if (Math.floor(Math.random() * data?.cast?.length - 1) > data?.cast?.length / 2) {
            return data.cast[Math.floor(Math.random() * data.length - 1)]
        } else {
            return data.crew[Math.floor(Math.random() * data.length - 1)]
        }
    } else {
        if (type) {
            return data.cast[Math.floor(Math.random() * data.length - 1)]
        } else {
            return data.crew[Math.floor(Math.random() * data.length - 1)]
        }
    }
}


@Resolver()
export class quizResolver {
    @Mutation(() => Quiz)
    async createQuiz(
        @Arg("publicId") publicId: string,
    ): Promise<Quiz | undefined> {
        // const quiz = await getQuiz(publicId)
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=f797a48d40f189b038093795534b113b")
        const data: any[] = response?.data?.results
        let movie = response.data.results[Math.floor(Math.random() * data.length - 1) || 1]
        const round = await Round.findOne({ where: { publicId } })
        const wrongQuiz = await Quiz.findAndCount({ where: { round: round, quizType: false } })
        const trueQuiz = await Quiz.findAndCount({ where: { round: round, quizType: true } })

        if (round?.roundType === "unlimited") {
            const actor = await getMoviesDetails(movie.id, round?.roundType)
            //console.log("xsd", quizzes)
            return Quiz.create({
                adult: movie.adult,
                actorName: actor?.character,
                originalName: actor?.original_name,
                actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                movieTitle: movie.title,
                movieDescription: movie.overview,
                releaseDate: movie.release_date,
                movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                round: round
            }).save()
        } else {
            const sup = 20 - wrongQuiz[1] + trueQuiz[1]
            if (wrongQuiz[1] > trueQuiz[1]) {
                const actor = await getMoviesDetails(movie.id, round?.roundType)
                //console.log("xsd", quizzes)
                return Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character,
                    originalName: actor?.original_name,
                    actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                    round: round
                }).save()
            } else if (wrongQuiz[1] < trueQuiz[1]) {
                const actor = await getMoviesDetails(movie.id, round?.roundType, false)
                //console.log("xsd", quizzes)
                return Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character,
                    originalName: actor?.original_name,
                    actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                    round: round
                }).save()
            } else if (sup > 0) {
                const actor = await getMoviesDetails(movie.id, round?.roundType)
                //console.log("xsd", quizzes)
                return Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character,
                    originalName: actor?.original_name,
                    actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                    round: round
                }).save()
            }
        }
        return undefined
    }

    @Query(() => Quiz, { nullable: true })
    async getQuizById(
        @Arg("id") id: string,
    ): Promise<Quiz | undefined> {
        return Quiz.findOne(id);
    }

    @Mutation(() => Quiz)
    async checkQuiz(
        @Arg("id") id: number,
        @Arg("publicId") publicId: string,
        @Arg("response") response: boolean,
        @Arg("score") score: number
    ): Promise<boolean | undefined | { error: string, status: number }> {
        const quiz = await Quiz.findAndCount({ where: { id: id, quizType: response } })

        if (quiz[1] > 0) {
            await Round.update(publicId, { score: score })
            return true
        }
        return false

    }
}
