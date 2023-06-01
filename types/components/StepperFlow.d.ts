import React, { ReactElement } from 'react';
import { StepProps } from './Step';
import { StepIconProps } from './StepIcon';
export interface StepperFlowProps extends StepProps, StepIconProps {
    children: ReactElement<StepperFlowProps, any>[];
    onChangeStep?: () => void;
    completedBarColor: string;
    incompletedBarColor: string;
}
declare const StepperFlow: ({ children, onChangeStep, showLabelAboveSteps, completedBarColor, incompletedBarColor, ...props }: StepperFlowProps) => React.JSX.Element;
export default StepperFlow;
