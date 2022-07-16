import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Quiz } from "../../generated/graphql";

/**
 * Card component for display actor info
 */

function ActorCard({ quiz }: { quiz: { createQuiz: { quiz: Quiz } } }) {
    if (!quiz) {
        return (
            <Flex alignItems="center" h="100vh" justifyContent="center">
                loading...
            </Flex>
        );
    }
    return (
        <Box maxW='xs' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={quiz.createQuiz.quiz.actorPicture} alt={quiz.createQuiz.quiz.originalName} />

            <Box p='6'>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {quiz.createQuiz.quiz.originalName}
                </Box>
            </Box>
        </Box>
    )
}

export default ActorCard;