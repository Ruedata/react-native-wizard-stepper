import { ReactElement } from 'react';
import { StepProps } from './Step';
import { StepIconProps } from './StepIcon';
export interface StepperFlowProps extends StepProps, StepIconProps {
  children: ReactElement<StepperFlowProps, any>[];
}
declare const StepperFlow: ({
  children,
  labelStyle,
  ...props
}: StepperFlowProps) => JSX.Element;
export default StepperFlow;
