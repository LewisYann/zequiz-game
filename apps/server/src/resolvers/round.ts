import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round, Quiz } from "../entities";


@Resolver()
export class roundResolver {
    @Mutation(() => Round)
    async createRound(): Promise<Round | Round[] | Quiz[] | undefined> {
        const round = await Round.create({ score: 0 }).save();
        //let quizzes = await getMoviesPopular(round.publicId)
        //console.log("xsd", quizzes)
        //Quiz.save(quizzes)
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
