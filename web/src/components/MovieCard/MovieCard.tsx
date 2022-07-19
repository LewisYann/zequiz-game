import React from "react";
import { Flex } from "@chakra-ui/react";
import { Quiz } from "../../generated/graphql"
import Card from 'react-bootstrap/Card';

/**
 * Card component for display Movie info
 */

function MovieCard({ quiz }: { quiz: { createQuiz: { quiz: Quiz } } }) {
    if (!quiz) {
        return (
            <Flex alignItems="center" h="100vh" justifyContent="center">
                loading...
            </Flex>
        );
    }
    return (
        <Card style={{ margin: 10 }}>
            <Card.Img variant="top" style={{maxHeight:320}} src={quiz.createQuiz.quiz.movieUrl} alt={quiz.createQuiz.quiz.movieTitle} />
            <Card.Body>
                <Card.Title>Movie</Card.Title>
                <Card.Text>
                    {quiz.createQuiz.quiz.movieTitle}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MovieCard;