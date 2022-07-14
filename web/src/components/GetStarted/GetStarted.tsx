import React, { useState } from "react";
import { UnorderedList, ListItem, Box, Grid, Button, Center, Select, Modal, ModalBody, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { StepType } from '../../types/GameStep'
import toast, { Toaster } from "react-hot-toast";
import { Round } from "../../generated/graphql";

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
    const [isOpen, setOpen] = useState(false)
    return (
        <Grid
            alignItems="center"
            h="100vh"
            justifyContent="center"
            fontWeight="bold"
            fontSize="2xl"
            m="10"
        >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Box>
                <h1>Game Rules</h1>
                <br />
                <Select onChange={(e) => setLevel(e.target.value)} >
                    <option value=''>Select game level</option>
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
                        onClick={() => {
                            if (level === '') {
                                setOpen(true)
                            } else {
                                try {

                                    onStarted({ roundType: level }).then((round: { data: { createRound: Round } }) => {
                                        if (round?.data?.createRound?.publicId) {
                                            setStep(StepType.Playing)
                                            toast.success("Starting game")
                                        }
                                    })
                                } catch {
                                    toast.error("An error has occured")
                                }
                            }
                        }
                        }
                        style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                    >
                        Play game
                    </Button>
                </Center>
            </Box>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => setOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Require Level</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Please select level type first one
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={() => setOpen(false)}>Okay</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Grid>
    );

};

export default GetStarted;
