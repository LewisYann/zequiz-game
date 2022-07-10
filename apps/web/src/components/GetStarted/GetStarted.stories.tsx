import React from 'react';
import GetStarted from './GetStarted';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default  {
    title: 'Game/Get Started',
    component: GetStarted,
};

const Template = (args: JSX.IntrinsicAttributes) => <GetStarted setStep={function (): void {
    throw new Error('Function not implemented.');
}} setLevel={function (): void {
    throw new Error('Function not implemented.');
}} level={''} onStarted={function (): Promise<any> {
    throw new Error('Function not implemented.');
}} isLoading={false} {...args} />;

export const Started = Template.bind({});
