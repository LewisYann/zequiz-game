import {
    Stat,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import { Quiz } from '../../generated/graphql';

const QuizCard = ({ quiz }: { quiz: { createQuiz: Quiz } }) => {

    return (
        <Stat>
            <StatLabel>Quiz</StatLabel>
            <StatNumber>Did {quiz?.createQuiz?.originalName} play as an actor in {quiz?.createQuiz?.movieTitle} film </StatNumber>
        </Stat>
    )
};

export default QuizCard;
