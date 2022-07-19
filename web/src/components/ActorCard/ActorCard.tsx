import React from "react";
import { Flex } from "@chakra-ui/react";
import { Quiz } from "../../generated/graphql";
import Card from 'react-bootstrap/Card';

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

        <Card style={{ margin: 10 }}>
            <Card.Img variant="top" style={{ maxHeight: 320 }} className="col-sm-6" src={quiz.createQuiz.quiz.actorPicture} alt={quiz.createQuiz.quiz.originalName} />
            <Card.Body>
                <Card.Title>Actor ?</Card.Title>
                <Card.Text>
                    {quiz.createQuiz.quiz.originalName}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ActorCard;