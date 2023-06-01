import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface StepperContainerProps {
  children: ReactNode;
  totalNumberSteps: number;
}

export interface StepperContextType {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
  isCompleted: boolean;
}

const StepperContext = createContext({
  activeStep: 0,
  nextStep: () => {},
  prevStep: () => {},
  totalSteps: 0,
  isCompleted: false,
});

const StepperProvider = ({ children, totalNumberSteps = 1 }: StepperContainerProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps] = useState(totalNumberSteps);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (activeStep === totalSteps - 1) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [activeStep]);

  const nextStep = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(prevState => prevState + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(previousState => previousState - 1);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        nextStep,
        prevStep,
        totalSteps,
        isCompleted,
      }}>
      {children}
    </StepperContext.Provider>
  );
};

export { StepperContext };

export default StepperProvider;
