import React from 'react';
import {
    Stat,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import { Quiz } from '../../generated/graphql';

/**
 * Card component for display Quiz
 */

const QuizCard = ({ quiz }: { quiz: { createQuiz: Quiz } }) => (
        <Stat>
            <StatLabel>Quiz</StatLabel>
            <StatNumber>Did {quiz?.createQuiz?.originalName} play as an actor in {quiz?.createQuiz?.movieTitle} film </StatNumber>
        </Stat>
    )

export default QuizCard;
