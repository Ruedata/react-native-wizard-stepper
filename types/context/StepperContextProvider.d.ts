import React, { ReactNode } from 'react';
interface StepperContainerProps {
    children: ReactNode;
    initialNumberOfSteps: number;
}
export interface StepperContextType {
    totalSteps: number;
    numberOfSteps: (totalStepsNumber: number) => void;
    activeStep: number;
    currentStep: (currentStepIndex: number) => void;
}
export declare const StepperContext: React.Context<StepperContextType>;
declare const StepperContainer: ({ children, initialNumberOfSteps }: StepperContainerProps) => JSX.Element;
export default StepperContainer;
