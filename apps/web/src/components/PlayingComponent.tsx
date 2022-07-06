import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button, Center } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import ActorCard from "../components/ActorCard";
import MovieCard from "../components/MovieCard";
import QuizCard from "../components/QuizCard";


export default function PlayingComponent() {

    return (
        <Container style={{ paddingTop: 30 }} >
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
                        <ActorCard />
                    </Center>

                </Col>
                <Col md={6}>
                    <Center>
                        <MovieCard />
                    </Center>

                </Col>

            </Row>
            <br />
            <Row>
                <Center>
                    <QuizCard />
                </Center>

            </Row>
            <Row>
                <Center>

                    <Button
                        mt={4}
                        style={{ justifyContent: "space-between", marginRight: 30 }}
                        //isLoading={isSubmitting}
                        colorScheme="red"
                    // onClick={() => router.push(`/admin/play`)}
                    >
                        Non

                    </Button>

                    <Button
                        mt={4}
                        //isLoading={isSubmitting}
                        colorScheme="green"
                        // onClick={() => router.push(`/admin/play`)}
                        style={{ justifyContent: "space-between", marginLeft: 30 }}
                    >
                        Oui

                    </Button>
                </Center>

            </Row>

        </Container>
    )
}