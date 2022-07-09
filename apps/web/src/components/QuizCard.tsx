import {
    Stat,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'

const QuizCard = ({ quiz }) => {

    return (
        <Stat>
            <StatLabel>Quiz</StatLabel>
            <StatNumber>Did {quiz?.data?.createQuiz?.originalName} play as an actor in {quiz?.data?.createQuiz?.movieTitle} film </StatNumber>
        </Stat>
    )
};

export default QuizCard;
