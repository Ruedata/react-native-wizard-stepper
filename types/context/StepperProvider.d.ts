import React, { ReactNode } from 'react';
interface StepperContainerProps {
    children: ReactNode;
    initialNumberSteps: number;
}
export interface StepperContextType {
    activeStep: number;
    nextStep: () => void;
    prevStep: () => void;
    totalSteps: number;
    isCompleted: boolean;
}
declare const StepperContext: React.Context<{
    activeStep: number;
    nextStep: () => void;
    prevStep: () => void;
    totalSteps: number;
    isCompleted: boolean;
}>;
declare const StepperProvider: ({ children, initialNumberSteps }: StepperContainerProps) => React.JSX.Element;
export { StepperContext };
export default StepperProvider;
