import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Quiz } from "../../generated/graphql";

/**
 * Card component for display actor info
 */

function ActorCard({ quiz }: { quiz: { createQuiz: Quiz } }) {

    return (
        <Box maxW='xs' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={quiz?.createQuiz?.actorPicture} alt={quiz?.createQuiz?.originalName} />

            <Box p='6'>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {quiz?.createQuiz?.originalName}
                </Box>
            </Box>
        </Box>
    )
}

export default ActorCard;