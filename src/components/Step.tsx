import React, { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export interface StepProps {
  children?: ReactNode;
  hide?: boolean;
  label?: string;
  labelStyle?: TextStyle | undefined;
}
const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};

export default Step;
