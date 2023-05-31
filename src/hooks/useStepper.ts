import { useContext } from 'react';
import { StepperContextType, StepperContext } from '../context/StepperProvider';

const useStepper = () => {
  const stepper = useContext<StepperContextType>(StepperContext);
  return stepper;
};

export default useStepper;
