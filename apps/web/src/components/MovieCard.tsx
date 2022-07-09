import { Box, Image, Badge } from "@chakra-ui/react";


function MovieCard({ quiz }) {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={quiz?.data?.createQuiz?.movieUrl} alt={quiz?.data?.createQuiz?.movieTitle} />

            <Box p='6'>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {quiz?.data?.createQuiz?.movieTitle}
                </Box>
            </Box>
        </Box>
    )
}

export default MovieCard;