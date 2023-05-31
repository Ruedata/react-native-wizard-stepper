import { ReactNode } from 'react';
import { TextStyle } from 'react-native';
export interface StepProps {
  children?: ReactNode;
  label?: string;
  labelStyle?: TextStyle | undefined;
}
declare const Step: ({ children }: StepProps) => JSX.Element;
export default Step;
