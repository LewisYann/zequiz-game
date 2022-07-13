import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button, Center, Spinner, Flex, Grid } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import ActorCard from "../ActorCard/ActorCard";
import MovieCard from "../MovieCard/MovieCard";
import QuizCard from "../QuizCard/QuizCard";
import { StepType } from "../../types/GameStep";
import { useCheckQuizMutation, useCreateQuizMutation } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import RenderTime from '../CountDown/CountDown';
import { Round } from "../../generated/graphql"

/**
 * Display quizzes and actor
 */

type PlayingType = {
    setStep: (event: any) => void;
    setNumberQuiz: (event: any) => void;
    round: Round;
    numberQuiz: number;
}
function useTime(timer: number) {
    const [time, setTime] = useState(0)
    const timeOut = setTimeout(
        () => {
            setTime((prev: number) => prev + 1)
        }, 1000
    )
    if (time > timer) {
        clearTimeout(timeOut)
        return -1
    }

    return time / 2
}
export default function PlayingComponent({ setStep, round, setNumberQuiz, numberQuiz }: PlayingType) {
    const [quiz, createQuiz] = useCreateQuizMutation()
    const [check, checkQuiz] = useCheckQuizMutation()
    const timer = useTime(300)
    useEffect(
        () => {
            if (timer === -1) {
                setStep(StepType.Failed)
                toast.error('Time out')
            }
        }, [timer]
    )

    useEffect(() => {
        createQuiz({ publicId: round?.publicId })
    }, [])

    function handleCheckResponse(response: boolean) {
        if (quiz.data?.createQuiz?.id) {
            checkQuiz({ score: numberQuiz * 10, response: response, checkQuizId: quiz.data.createQuiz.id, publicId: round.publicId })
                .then(
                    (data) => {
                        if (data.data?.checkQuiz === true) {
                            toast.success('Bravooo !')
                            setNumberQuiz((p: number) => p + 1)
                            if (round?.roundType === "20" && numberQuiz >= 20)
                                setStep(StepType.Success)
                            else
                                createQuiz({ publicId: round?.publicId })
                        } else if (data.data?.checkQuiz === false) {
                            toast.error('Oopss!')
                            setStep(StepType.Failed)
                        }
                    }
                )
        }

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
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div>
                    <Spinner />
                </div>
                <div>
                    <h2>Loading ...</h2>
                </div>
            </Flex>

        )
    }

    if (quiz.error) {
        return (

            <Grid
                alignItems="center"
                h="100vh"
                justifyContent="center"
                fontWeight="bold"
                fontSize="5xl"
            >
                An error has occurred, plean try again
                <Center>
                    <Button
                        type="submit"
                        mt={4}
                        colorScheme="blue"
                        onClick={() => createQuiz({ publicId: round.publicId })}
                        style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                    >
                        Try again
                    </Button>
                </Center>
            </Grid>

        )
    }
    return (
        <Container style={{ paddingTop: 30 }} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Row>
                <Col md={4} sm={0}>
                    <div style={{ position: "fixed" }}>
                        <Button>
                            <h3>{timer} secondes </h3>
                        </Button>
                    </div>
                </Col>
                <Col>
                    <Center style={{}}>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying

                            duration={60}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[7, 5, 2, 0]}
                            onComplete={() => {
                                toast('Time out')
                                setStep(StepType.Failed)
                            }}
                        >
                            {RenderTime}
                        </CountdownCircleTimer>
                    </Center>
                </Col>

                <Col>
                    <p>Score: {numberQuiz * 10}</p>
                    <p>Quizzes Answered:{numberQuiz}/{round?.roundType}</p>
                    <p>Quizzes Left : {round?.roundType}</p>
                </Col>
            </Row>
            <Row >
                <Col md={6}>
                    <Center>
                        {/*@ts-ignore*/}
                        <ActorCard quiz={quiz.data} />
                    </Center>

                </Col>
                <Col md={6}>
                    <Center>
                        {/*@ts-ignore*/}
                        <MovieCard quiz={quiz.data} />
                    </Center>

                </Col>

            </Row>
            <br />
            <Row>
                <Center>
                    {/*@ts-ignore*/}
                    <QuizCard quiz={quiz.data} />
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

        </Container >
    )
}