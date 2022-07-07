import { UnorderedList, ListItem, Box, Grid, Button, Center, } from "@chakra-ui/react";
import { StepType } from "../types/GameStep";

const ResultPlayComponent = ({ setStep }) => {

    return (
        <Grid
            alignItems="center"
            h="100vh"
            justifyContent="center"
            fontWeight="bold"
            fontSize="2xl"
        >
            <Box>
                <div style={{ textAlign: "center" }}>
                    <h1> Oops ! Game Over </h1> <br />
                    <h1> Score: 80</h1> <br />
                    <h3>Vous avez repondu a 5 question sur 20</h3>
                </div>
                <Center>
                    <Button
                        type="submit"
                        mt={4}
                        //isLoading={isSubmitting}
                        colorScheme="blue"
                        onClick={() => setStep(StepType.Started)}
                        style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                    >
                        Replay
                    </Button>
                </Center>
            </Box>
        </Grid>
    );

};

export default ResultPlayComponent;