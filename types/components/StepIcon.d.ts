import React from 'react';
import { TextStyle } from 'react-native';
export interface StepIconProps {
    label?: string;
    labelStyle?: TextStyle;
    stepNumber?: number;
    isActiveStep?: boolean;
    isCompletedStep?: boolean;
    completedStepIconColor?: string;
    completeStepNumColor?: string;
    activeStepIconColor?: string;
    activeStepNumColor?: string;
    disabledStepNumColor?: string;
    showLabelAboveSteps?: boolean;
}
declare const StepIcon: ({ label, labelStyle, stepNumber, isActiveStep, isCompletedStep, completedStepIconColor, activeStepIconColor, activeStepNumColor, completeStepNumColor, disabledStepNumColor, showLabelAboveSteps, }: StepIconProps) => React.JSX.Element;
export default StepIcon;
