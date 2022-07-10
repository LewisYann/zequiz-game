import { Box, Image } from "@chakra-ui/react";
import { Quiz } from "../generated/graphql"


function MovieCard({ quiz }: { quiz: { createQuiz: Quiz }  }) {

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={quiz?.createQuiz?.movieUrl} alt={quiz?.createQuiz?.movieTitle} />

            <Box p='6'>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {quiz?.createQuiz?.movieTitle}
                </Box>
            </Box>
        </Box>
    )
}

export default MovieCard;