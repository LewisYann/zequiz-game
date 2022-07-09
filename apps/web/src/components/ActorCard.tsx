import { Box, Image } from "@chakra-ui/react";


function ActorCard({ quiz }) {
    console.log("quiz", quiz)

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={quiz?.data?.createQuiz?.actorPicture} alt={quiz?.data?.createQuiz?.originalName} />

            <Box p='6'>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {quiz?.data?.createQuiz?.originalName}
                </Box>
            </Box>
        </Box>
    )
}

export default ActorCard;