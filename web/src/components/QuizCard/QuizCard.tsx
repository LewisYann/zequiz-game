import React from 'react';
import {
    Flex,
    Stat,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import { Quiz } from '../../generated/graphql';

/**
 * Card component for display Quiz
 */

const QuizCard = ({ quiz }: { quiz: { createQuiz: { quiz: Quiz } } }) => {
    
    if (!quiz) {
        return (
            <Flex alignItems="center" h="100vh" justifyContent="center">
                loading...
            </Flex>
        );
    }

    return (
        <Stat>
            <StatLabel>Quiz</StatLabel>
            <StatNumber>Did {quiz.createQuiz.quiz.originalName} play as an actor in {quiz.createQuiz.quiz.movieTitle} film </StatNumber>
        </Stat>
    )
}

export default QuizCard;
