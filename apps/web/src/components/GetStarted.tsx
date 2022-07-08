import { UnorderedList, ListItem, Box, Grid, Button, Center, Select } from "@chakra-ui/react";
import { StepType } from "../types/GameStep";

function GetStarted({ setStep, setLevel }) {


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

                <Select onChange={(e) => setLevel(e.target.value)} >
                    <option>Select game level</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                    <option value="unlimited">Illimité</option>
                </Select>
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
                        onClick={() => setStep(StepType.Playing)}
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
