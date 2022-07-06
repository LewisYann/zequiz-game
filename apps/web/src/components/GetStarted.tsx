import { UnorderedList, ListItem, Box, Grid, Button, Center, } from "@chakra-ui/react";

const GetStarted = () => {

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
                        onClick={() => {}}
                        style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                    >
                        Play game

                    </Button>
                </Center>
            </Box>
        </Grid>
    );

};

export default GetStarted;
