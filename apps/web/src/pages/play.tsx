import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, Center } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";

import GetStarted from "../components/GetStarted"
import PlayingComponent from "../components/PlayingComponent";

import { useState } from "react";

enum StepType {
    Started = "Started",
    Playing = "Playing",
    Success = "Success",
    Failed = "Failed"
}

const Play: NextPage = () => {
    const [step, setStep] = useState(StepType.Started)

    if (step == StepType.Started)
        return <GetStarted />
    else if (step == StepType.Playing)
        return <PlayingComponent />
    else if (step == StepType.Success)
        return <GetStarted />
    else if (step == StepType.Failed)
        return <GetStarted />



};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
