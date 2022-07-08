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


const Play: NextPage = () => {
    const [step, setStep] = useState(StepType.Started);
    const [level, setLevel] = useState("20");

    if (step == StepType.Started)
        return <GetStarted setStep={setStep} setLevel={setLevel} />
    else if (step == StepType.Playing)
        return <PlayingComponent setStep={setStep} />
    else if (step == StepType.Success || step == StepType.Failed)
        return <ResultPlayComponent setStep={setStep} />

    return <></>

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
