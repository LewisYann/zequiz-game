import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Flex } from "@chakra-ui/react";

const Play: NextPage = () => {

    return (
        <Flex
            alignItems="center"
            h="100vh"
            justifyContent="center"
            fontWeight="bold"
            fontSize="5xl"
        >
            <CountdownCircleTimer
                isPlaying
                duration={7}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            Welcome
        </Flex>
    );

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
