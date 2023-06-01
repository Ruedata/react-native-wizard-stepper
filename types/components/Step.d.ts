import React, { ReactNode } from 'react';
import { TextStyle } from 'react-native';
export interface StepProps {
    children?: ReactNode;
    hide?: boolean;
    label?: string;
    labelStyle?: TextStyle | undefined;
}
declare const Step: ({ children }: StepProps) => React.JSX.Element;
export default Step;
