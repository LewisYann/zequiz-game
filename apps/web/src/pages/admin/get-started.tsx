import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Flex, UnorderedList, ListItem, Box, Grid, Button, Center, } from "@chakra-ui/react";
import { useRouter } from "next/router";

const GetStarted: NextPage = () => {
    const router=useRouter()
    return (
        <Grid
            alignItems="center"
            h="100vh"
            justifyContent="center"
            fontWeight="bold"
            fontSize="2xl"
        >
            <Box>
                <h1>Game Rules</h1>
                <UnorderedList>
                    <ListItem>Lorem ipsum dolor sit amet</ListItem>
                    <ListItem>Consectetur adipiscing elit</ListItem>
                    <ListItem>Integer molestie lorem at massa</ListItem>
                    <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
                <Center>
                    <Button
                        type="submit"
                        mt={4}
                        //isLoading={isSubmitting}
                        colorScheme="blue"
                        onClick={() => router.push(`/admin/play`)}
                        style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                    >
                        Play game

                    </Button>
                </Center>
            </Box>
        </Grid>
    );

};

export default withUrqlClient(createUrqlClient, { ssr: true })(GetStarted);
