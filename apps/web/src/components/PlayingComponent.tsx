import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button, Center, Spinner, Flex } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import ActorCard from "../components/ActorCard";
import MovieCard from "../components/MovieCard";
import QuizCard from "../components/QuizCard";
import { StepType } from "../types/GameStep";
import { useCheckQuizMutation, useCreateQuizMutation } from '../generated/graphql';
import { useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";

export default function PlayingComponent({ setStep, round }) {

    const [quiz, createQuiz] = useCreateQuizMutation()
    const [check, checkQuiz] = useCheckQuizMutation()

    console.log("round", round)
    useEffect(() => {
        if (round.data.createRound)
            createQuiz({ publicId: round.data.createRound.publicId })
    }, [])

    function handleCheckResponse(response: boolean) {
        checkQuiz({ score: round.data.createRound.score, response: response, checkQuizId: quiz.data?.createQuiz?.id, publicId: round.data.createRound.publicId })
            .then(
                (data) => {
                    if (data.data?.checkQuiz == true) {
                        toast.success('Bravooo !')
                        createQuiz({ publicId: round.data.createRound.publicId })
                    } else if (data.data?.checkQuiz == false) {
                        toast.error('Oopss!')
                        setStep(StepType.Failed)
                    }
                }
            )

    }
    if (quiz.fetching) {
        return (

            <Flex
                alignItems="center"
                h="100vh"
                justifyContent="center"
                fontWeight="bold"
                fontSize="5xl"
            >
                <div>
                    <Spinner />
                </div>
                <div>
                    <h2>Loading ...</h2>
                </div>
            </Flex>

        )
    }
    return (
        <Container style={{ paddingTop: 30 }} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Row>
                <Center>
                    <CountdownCircleTimer
                        size={150}
                        isPlaying
                        duration={60 * 2}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}>

                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </Center>
            </Row>
            <Row >
                <Col md={6}>
                    <Center>
                        <ActorCard quiz={quiz} />
                    </Center>

                </Col>
                <Col md={6}>
                    <Center>
                        <MovieCard quiz={quiz} />
                    </Center>

                </Col>

            </Row>
            <br />
            <Row>
                <Center>
                    <QuizCard quiz={quiz} />
                </Center>

            </Row>
            <Row>
                <Center>
                    {
                        check.fetching ? (
                            <div>
                                <Spinner />
                                <h2> Verifying ... </h2>
                            </div>
                        ) : (
                            <>
                                <Button
                                    mt={4}
                                    style={{ justifyContent: "space-between", marginRight: 30 }}
                                    colorScheme="red"
                                    onClick={() => handleCheckResponse(false)}
                                >
                                    Non
                                </Button>

                                <Button
                                    mt={4}
                                    colorScheme="green"
                                    onClick={() => handleCheckResponse(true)}
                                    style={{ justifyContent: "space-between", marginLeft: 30 }}
                                >
                                    Oui
                                </Button>

                            </>
                        )
                    }

                </Center>

            </Row>

        </Container>
    )
}