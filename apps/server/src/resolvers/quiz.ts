import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round, Quiz } from "../entities";
import axios from "axios";


async function getMoviesDetails(movieId: number, roundType: any, type?: boolean) {
    let response = null
    do {
        response = await axios.get("https://api.themoviedb.org/3/movie/" + movieId.toString() + "/credits?api_key=f797a48d40f189b038093795534b113b")
        setTimeout(() => console.log('count'), 3000)
    } while (!response.data)


    const data: any = response?.data
    console.log('data', response)
    if (roundType === "unlimited" || typeof type == "undefined") {
        if (Math.floor(Math.random() * data?.cast?.length - 1) > data?.cast?.length / 2) {
            const tmp = Math.floor(Math.random() * data.cast.length - 1)
            const res = data.cast[tmp < 0 ? 0 : tmp]
            console.log("cast data", data.cast)
            console.log("tmp", tmp)
            res.quizType = true
            return res
        } else {
            const tmp = Math.floor(Math.random() * data.crew.length - 1)
            const res = data.crew[tmp < 0 ? 0 : tmp]
            console.log("crew data", data.crew)
            console.log("tmp", tmp)
            res.quizType = false
            return res
        }
    } else {
        if (type) {
            const tmp = Math.floor(Math.random() * data.cast.length - 1)
            const res = data.cast[tmp < 0 ? 0 : tmp]
            res.quizType = true
            return res
        } else {
            const tmp = Math.floor(Math.random() * data.crew.length - 1)
            const res = data.crew[tmp < 0 ? 0 : tmp]
            res.quizType = false
            return res
        }
    }
}


@Resolver()
export class quizResolver {
    @Mutation(() => Quiz, { nullable: true })
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
        console.log("movie", movie)
        if (round?.roundType === "unlimited") {
            if (typeof movie.id == "undefined")
                return undefined
            const actor = await getMoviesDetails(movie.id, round?.roundType)
            //console.log("xsd", quizzes)
            return Quiz.create({
                adult: movie.adult,
                actorName: actor?.character || actor?.job,
                originalName: actor?.original_name,
                actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                movieTitle: movie.title,
                movieDescription: movie.overview,
                releaseDate: movie.release_date,
                movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                round: round,
                quizType: actor.quizType
            }).save()
        } else {
            const sup = 20 - wrongQuiz[1] + trueQuiz[1]
            if (wrongQuiz[1] > trueQuiz[1]) {
                const actor = await getMoviesDetails(movie.id, round?.roundType)
                //console.log("xsd", quizzes)
                return Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character || actor?.job,
                    originalName: actor?.original_name,
                    actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                    round: round,
                    quizType: actor.quizType

                }).save()
            } else if (wrongQuiz[1] < trueQuiz[1]) {
                const actor = await getMoviesDetails(movie.id, round?.roundType, false)
                //console.log("xsd", quizzes)
                return Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character || actor?.job,
                    originalName: actor?.original_name,
                    actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                    round: round,
                    quizType: actor.quizType

                }).save()
            } else if (sup > 0) {
                const actor = await getMoviesDetails(movie.id, round?.roundType)
                //console.log("xsd", quizzes)
                return Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character || actor?.job,
                    originalName: actor?.original_name,
                    actorPicture: "http://image.tmdb.org/t/p/w500" + actor?.profile_path,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
                    round: round,
                    quizType: actor.quizType

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
