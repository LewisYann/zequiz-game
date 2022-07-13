import React, { useState } from "react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import ResultPlayComponent from "../components/ResultPlayComponent/ResultPlayComponent";
import GetStarted from "../components/GetStarted/GetStarted"
import PlayingComponent from "../components/PlayingComponent/PlayingComponent";
import { StepType } from "../types/GameStep";
import { useCreateRoundMutation } from "../generated/graphql";


const Play: NextPage = () => {
    const [step, setStep] = useState(StepType.Playing);
    const [level, setLevel] = useState("20");
    const [round, createRound] = useCreateRoundMutation()
    const [numberQuiz, setNumberQuiz] = useState(0)
    
    switch (step) {
        case StepType.Started:
            return <GetStarted level={level} setStep={setStep} isLoading={round.fetching} setLevel={setLevel} onStarted={createRound} />
            break
        case StepType.Playing:
            if (!round.fetching) {
                {/*@ts-ignore*/ }
                return <PlayingComponent setNumberQuiz={setNumberQuiz} setStep={setStep} round={round.data?.createRound} numberQuiz={numberQuiz} />
            }
            break
        case StepType.Success:
            {/*@ts-ignore*/ }
            return <ResultPlayComponent numberQuiz={numberQuiz} setNumberQuiz={setNumberQuiz} round={round.data?.createRound} setStep={setStep} />
            break
        case StepType.Failed:
            {/*@ts-ignore*/ }
            return <ResultPlayComponent numberQuiz={numberQuiz} setNumberQuiz={setNumberQuiz} round={round.data?.createRound} setStep={setStep} />
            break
        default:
            break
    }

    return <></>

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
