import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round, Quiz } from "../entities";
//import { ApolloError } from "apollo-server-express";
import axios from "axios";
import { FieldError, QuizResponse } from "../types";
import { validateCheckQuiz } from "../utils/validate";


async function getMoviesDetails(movieId: number, roundType: any, type?: boolean) {
    let response = null
    response = await axios.get(`${process.env.MOVIE_URL}/3/movie/${movieId.toString()}/credits?api_key=${process.env.API_KEY}`)
    setTimeout(() => console.log('count'), 3000)
    let data: any = response?.data
    if (!response.data)
        return false
    data.cast = data.cast.filter((cast: any) => cast.profile_path != null)
    data.crew = data.crew.filter((crew: any) => crew.profile_path != null)

    if (roundType === "unlimited" || typeof type == "undefined") {
        if (Math.floor(Math.random() * data?.cast?.length - 1) > data?.cast?.length / 2) {
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
    @Mutation(() => QuizResponse)
    async createQuiz(
        @Arg("publicId") publicId: string): Promise<QuizResponse> {
        if (!publicId) {
            return {
                errors: [
                    {
                        field: "publicId",
                        message: "Missing publicId paramters."
                    }
                ]
            }
        }
        const response = await axios.get(`${process.env.MOVIE_URL}/3/movie/top_rated?api_key=${process.env.API_KEY}`)

        if (!response.data) {
            return {
                errors: [
                    {
                        field: "quiz fetching",
                        message: "Unable to fetching a quiz"
                    }
                ]
            }
        }
        const data: any[] = response.data.results
        let movie = response.data.results[Math.floor(Math.random() * data.length - 1) || 1]
        const round = await Round.findOne({ where: { publicId } })
        if (!round) {
            return {
                errors: [
                    {
                        field: "publicId",
                        message: "This round cannot be found"
                    }
                ]
            }
        }
        const wrongQuiz = await Quiz.findAndCount({ where: { round: round, quizType: false } })
        const trueQuiz = await Quiz.findAndCount({ where: { round: round, quizType: true } })

        if (round.roundType === "unlimited") {
            const actor = await getMoviesDetails(movie.id, round.roundType)
            if (!actor) {
                return {
                    errors: [
                        {
                            field: "actor data fetching",
                            message: "Unable to fetching actor data for quiz quiz"
                        }
                    ]
                }
            }
            const quiz = await Quiz.create({
                adult: movie.adult,
                actorName: actor?.character || actor?.job,
                originalName: actor?.original_name,
                actorPicture: `${process.env.PICTURE_URL}/${actor?.profile_path}`,
                movieTitle: movie.title,
                movieDescription: movie.overview,
                releaseDate: movie.release_date,
                movieUrl: `${process.env.PICTURE_URL}/${movie.poster_path}`,
                round: round,
                quizType: actor.quizType
            }).save()
            return { quiz }

        } else {
            const sup = 20 - wrongQuiz[1] + trueQuiz[1]
            if (wrongQuiz[1] > trueQuiz[1]) {
                const actor = await getMoviesDetails(movie.id, round.roundType)
                if (!actor) {
                    return {
                        errors: [
                            {
                                field: "actor data fetching",
                                message: "Unable to fetching actor data for quiz quiz"
                            }
                        ]
                    }
                }
                const quiz = await Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character || actor?.job,
                    originalName: actor?.original_name,
                    actorPicture: `${process.env.PICTURE_URL}/${actor?.profile_path}`,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: `${process.env.PICTURE_URL}/${movie.poster_path}`,
                    round: round,
                    quizType: actor.quizType

                }).save()
                return { quiz }

            } else if (wrongQuiz[1] < trueQuiz[1]) {
                const actor = await getMoviesDetails(movie.id, round?.roundType, false)
                if (!actor) {
                    return {
                        errors: [
                            {
                                field: "actor data fetching",
                                message: "Unable to fetching actor data for quiz quiz"
                            }
                        ]
                    }
                }
                const quiz = await Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character || actor?.job,
                    originalName: actor?.original_name,
                    actorPicture: `${process.env.PICTURE_URL}/${actor?.profile_path}`,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: `${process.env.PICTURE_URL}/${movie.poster_path}`,
                    round: round,
                    quizType: actor.quizType
                }).save()
                return { quiz }
            } else if (sup > 0) {
                const actor = await getMoviesDetails(movie.id, round?.roundType)
                if (!actor) {
                    return {
                        errors: [
                            {
                                field: "actor data fetching",
                                message: "Unable to fetching actor data for quiz quiz"
                            }
                        ]
                    }
                }
                const quiz = await Quiz.create({
                    adult: movie.adult,
                    actorName: actor?.character || actor?.job,
                    originalName: actor?.original_name,
                    actorPicture: `${process.env.PICTURE_URL}/${actor?.profile_path}`,
                    movieTitle: movie.title,
                    movieDescription: movie.overview,
                    releaseDate: movie.release_date,
                    movieUrl: `${process.env.PICTURE_URL}/${movie.poster_path}`,
                    round: round,
                    quizType: actor.quizType
                }).save()
                return { quiz }
            }
        }
        return {
            errors: [
                {
                    field: "unknown",
                    message: "An error has occured"
                }
            ]
        }
    }

    @Query(() => QuizResponse)
    async getQuizById(
        @Arg("id") id: string,
    ): Promise<QuizResponse> {
        if (!id) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Missing id parameter"
                    }
                ]
            }
        }
        const quiz = await Quiz.findOne(id);
        if (!quiz) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Unable to find this quiz"
                    }
                ]
            }
        }
        return { quiz }
    }

    @Mutation(() => Boolean)
    async checkQuiz(
        @Arg("id") id: number,
        @Arg("publicId") publicId: string,
        @Arg("response") response: boolean,
        @Arg("score") score: number
    ): Promise<boolean | FieldError[]> {

        const errors = validateCheckQuiz({ id, publicId, response, score });
        if (errors) {
            return errors;
        }
        const round = Round.findOne({ where: { publicId: publicId } })
        if (!round) {
            return [
                {
                    field: "id",
                    message: "Unable to find this round"
                }
            ]

        }
        const quiz = await Quiz.findAndCount({ where: { id: id, quizType: response } })
        if (quiz[1] > 0) {
            await Round.update(publicId, { score: score + 10 })
            return true
        }
        else {
            return false
        }
    }
}


