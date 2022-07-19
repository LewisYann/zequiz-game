import React from "react";
import { Box, Grid, Button, Center, } from "@chakra-ui/react";
import { Round } from "../../generated/graphql";
import { StepType } from "../../types/GameStep";

/**
 * Render result of round
 */

const ResultPlayComponent = ({ setStep, numberQuiz, round, setNumberQuiz }: { setNumberQuiz: (event: any) => void, setStep: (event: StepType) => void, numberQuiz: number, round: { round: Round } }) => (
    
    <Grid
        alignItems="center"
        h="100vh"
        justifyContent="center"
        fontWeight="bold"
        fontSize="2xl"
    >
        <Box>
            {
                numberQuiz >= 20 && round.round.roundType === "20" ? (
                    <div style={{ textAlign: "center" }}>
                        <h1> Congratulationnn !!! </h1> <br />
                        <h1> Score: {numberQuiz * 10}</h1> <br />
                        <h3>You answered {numberQuiz} questions</h3>
                    </div>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <h1> Oops ! End of game </h1> <br />
                        <h1> Score: {numberQuiz * 10}</h1> <br />
                        <h3>You answered {numberQuiz} questions</h3>
                    </div>
                )
            }

            <Center>
                <Button
                    type="submit"
                    mt={4}
                    //isLoading={isSubmitting}
                    colorScheme="blue"
                    onClick={() => {
                        setNumberQuiz(0)
                        setStep(StepType.Started)
                    }}
                    style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                >
                    Replay
                </Button>
            </Center>
        </Box>
    </Grid>
);


export default ResultPlayComponent;
