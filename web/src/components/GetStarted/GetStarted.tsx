import React from "react";
import { UnorderedList, ListItem, Box, Grid, Button, Center, Select } from "@chakra-ui/react";
import { StepType } from '../../types/GameStep'
import toast from "react-hot-toast";

/**
 * Starter game screen component 
 */

type GetStartedType = {
    setStep: (event: any) => void;
    setLevel: (event: any) => void;
    level: string;
    onStarted: (event: any) => Promise<any>;
    isLoading: boolean;
}
function GetStarted({ setStep, setLevel, level, onStarted, isLoading }: GetStartedType) {

    return (
        <Grid
            alignItems="center"
            h="100vh"
            justifyContent="center"
            fontWeight="bold"
            fontSize="2xl"
            m="10"
        >
            <Box>
                <h1>Game Rules</h1>
                <br />
                <Select onChange={(e) => setLevel(e.target.value)} >
                    <option>Select game level</option>
                    <option value="20">20</option>
                    <option value="unlimited">Unlimited</option>
                </Select>
                <br />
                <UnorderedList>
                    <ListItem>Level 20: Answer 20 questions  without <br /> error, and you will be a winner</ListItem>
                    <ListItem>Level unlimited: No question limit, try <br /> to beat your record</ListItem>
                    <ListItem>You have 300 secondes (5 minutes) </ListItem>
                </UnorderedList>
                <Center>
                    <Button
                        type="submit"
                        mt={4}
                        isLoading={isLoading}
                        colorScheme="blue"
                        onClick={() => onStarted({ roundType: level }).then((round: any) => {
                            if (round?.data?.createRound?.publicId) {
                                setStep(StepType.Playing)
                                toast.error("An error has occured")
                            }
                        })}
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
