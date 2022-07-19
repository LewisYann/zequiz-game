import { roundResponse } from "../types";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Round } from "../entities";



@Resolver()
export class roundResolver {
    @Mutation(() => roundResponse)
    async createRound(
        @Arg("roundType") roundType: string,
    ): Promise<roundResponse> {
        if (roundType.length < 2) {
            return {
                errors: [
                    {
                        field: "roundType",
                        message: "invalide roundType"
                    }
                ]
            }
        }
        const round = await Round.create({ score: 0, roundType: roundType }).save();

        if (!round) {
            return {
                errors: [
                    {
                        field: " Create create error",
                        message: "Unable to create an round now, please try again "
                    }
                ]
            }
        }
        return { round }
    }

    @Query(() => roundResponse)
    async getRoundById(
        @Arg("publicId") publicId: string,
    ): Promise<roundResponse> {
        const round = await Round.findOne(publicId, { relations: ['quiz'] });

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
        return { round }

    }

    @Mutation(() => roundResponse)
    async updateScore(
        @Arg("publicId") publicId: string,
        @Arg("score") score: number
    ): Promise<roundResponse> {

        const round = await Round.findOne({ where: { publicId: publicId } })
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

        await Round.update(publicId, { score: round.score + score })
        return { round: round }
    }
}
