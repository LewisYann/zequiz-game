import { ApolloError } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round } from "../entities";


@Resolver()
export class roundResolver {
    @Mutation(() => Round)
    async createRound(
        @Arg("roundType") roundType: string,
    ): Promise<Round | undefined> {
        try {
            const round = await Round.create({ score: 0, roundType: roundType }).save();
            return Round.findOne(round.publicId, { relations: ['quiz'] })
        }
        catch {
            throw new ApolloError('Cannot create a round, please try later', 'ERROR_CREATE_ROUND');
        }
    }

    @Query(() => Round, { nullable: true })
    async getRoundById(
        @Arg("publicId") publicId: string,
    ): Promise<Round | undefined> {
        return Round.findOneOrFail(publicId, { relations: ['quiz'] });

    }

    @Mutation(() => Round)
    async updateScore(
        @Arg("publicId") publicId: string,
        @Arg("score") score: number
    ): Promise<Round | undefined> {

        const round = await Round.findOneOrFail({ where: { publicId: publicId } })
        try {

            await Round.update(publicId, { score: round.score + score })
            return round

        } catch {
            throw new ApolloError('Cannot update this round, please try later', 'ERROR_UPDATE_ROUND');

        }
    }
}
