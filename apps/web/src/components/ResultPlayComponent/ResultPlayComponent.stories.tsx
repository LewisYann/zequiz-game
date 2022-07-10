
import React from 'react';
import ResultatPlayComponent from './ResultPlayComponent';



//More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Quiz/Result Component',
    component: ResultatPlayComponent,
    argTypes: {
        //quiz: { createQuiz: Quiz }
    },
};
const Template = (args: JSX.IntrinsicAttributes) => <ResultatPlayComponent
    setNumberQuiz={
        (): void => {
            throw new Error('Function not implemented.');
        }}
    setStep={
         (): void =>{
            throw new Error('Function not implemented.');
        }
    } 
    numberQuiz={0} 
    round={{
        createdAt: '',
        publicId: '',
        quiz: [],
        roundType: '',
        score: 0,
        updatedAt: ''
    }} {...args} />;

export const ResultGame = Template.bind({});
