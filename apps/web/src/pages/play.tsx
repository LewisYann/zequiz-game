import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, Center } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import ResultPlayComponent from "../components/ResultPlayComponent";
import GetStarted from "../components/GetStarted"
import PlayingComponent from "../components/PlayingComponent";
import { useState } from "react";
import { StepType } from "../types/GameStep";
import { useCreateRoundMutation } from "../generated/graphql";


const Play: NextPage = () => {
    const [step, setStep] = useState(StepType.Started);
    const [level, setLevel] = useState("20");
    const [round, createRound] = useCreateRoundMutation()
    const [numberQuiz, setNumberQuiz] = useState(0)
    if (step == StepType.Started)
        return <GetStarted level={level} setStep={setStep} isLoading={round.fetching} setLevel={setLevel} onStarted={createRound} />
    else if (step == StepType.Playing)
        return <PlayingComponent setNumberQuiz={setNumberQuiz} setStep={setStep} round={round} numberQuiz={numberQuiz} />
    else if (step == StepType.Success || step == StepType.Failed)
        return <ResultPlayComponent numberQuiz={numberQuiz} setStep={setStep} />

    return <></>

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
