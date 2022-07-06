import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Button, Center } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import ActorCard from "../../components/ActorCard";
import MovieCard from "../../components/MovieCard";

const Play: NextPage = () => {

    return (
        <Container style={{ paddingTop: 30 }} >
            <Row >
                <Col md={5}>
                    <ActorCard />
                </Col>
                <Col md={5}>
                    <MovieCard />
                </Col>
                <Col md={2} style={{}}>
                    <CountdownCircleTimer
                        isPlaying
                        duration={60 * 2}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}>

                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </Col>
            </Row>
            <Row>
                <Center>
                    <Col
                        md={5}
                    >
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
                    </Col>
                </Center>

            </Row>

        </Container>
    );

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
