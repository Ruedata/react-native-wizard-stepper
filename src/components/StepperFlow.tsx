import React, {
  isValidElement,
  useEffect,
  useState,
  ReactElement,
  useMemo,
  Children,
  cloneElement,
} from 'react';
import { LayoutRectangle, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useStepper } from '../hooks';
import { StepProps } from './Step';
import StepIcon, { StepIconProps } from './StepIcon';

export interface StepperFlowProps extends StepProps, StepIconProps {
  children: ReactElement<StepperFlowProps, any>[];
  onChangeStep?: () => void;
  completedBarColor: string;
  incompletedBarColor: string;
}

const StepperFlow = ({
  children,
  onChangeStep,
  showLabelAboveSteps = true,
  completedBarColor,
  incompletedBarColor,
  ...props
}: StepperFlowProps) => {
  const { width } = useWindowDimensions();
  const [stepIconWidthOffSet, setStepIconWidthOffSet] = useState<
    Array<{
      layout: LayoutRectangle;
      target?: number | null | undefined;
    }>
  >([]);

  const { activeStep, totalSteps } = useStepper();

  useEffect(() => {
    if (onChangeStep) {
      onChangeStep();
    }
  }, [activeStep]);

  const renderChildren = useMemo(() => {
    const tmp = Children.map(children, ele => {
      if (ele && isValidElement(ele) && !ele?.props?.hide) {
        return cloneElement(ele);
      }
    });
    return tmp;
  }, [children]);

  const renderStepIcons = () => {
    let step = [];
    let i = 0;

    while (i !== totalSteps) {
      const isCompletedStep = i < activeStep;
      const isActiveStep = i === activeStep;
      step.push(
        <View
          key={i}
          style={{ flex: 1 }}
          onLayout={({ nativeEvent: offSet }) => {
            setStepIconWidthOffSet(s => {
              return [...s, offSet].slice(-totalSteps).sort((a, b) => {
                return a.layout.x - b.layout.x;
              });
            });
          }}>
          <StepIcon
            {...{ ...props, showLabelAboveSteps }}
            stepNumber={i + 1}
            isCompletedStep={isCompletedStep}
            isActiveStep={isActiveStep}
            label={renderChildren[i]?.props?.label ?? ''}
          />
        </View>,
      );
      i++;
    }
    return step;
  };

  const calculateIndicatorTop = (widthParam: number): number => {
    const threshold: number = (widthParam * 10) / 100;
    const isThresholdMet: boolean = threshold >= 50;

    if (showLabelAboveSteps) {
      return isThresholdMet ? 77 : (width * 27) / 200;
    } else {
      return isThresholdMet ? 30 : threshold / 2;
    }
  };

  const indicatorTop = useMemo(() => calculateIndicatorTop(width), [width, showLabelAboveSteps]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          maxHeight: 115,
          backgroundColor: 'transparent',
        }}>
        <View
          style={[
            styles.stepIcons,
            {
              maxHeight: 115,
              height: (width * 20) / 100,
              width: width,
            },
          ]}>
          {renderStepIcons()}
          <View
            style={[
              styles.stepIndicatorOuter,
              {
                backgroundColor: incompletedBarColor,
                top: indicatorTop,
                width: stepIconWidthOffSet[totalSteps - 1]?.layout?.x,
              },
            ]}>
            <View
              style={{
                borderColor: completedBarColor,
                width: stepIconWidthOffSet[activeStep]?.layout?.x,
                borderWidth: 1.5,
              }}
            />
          </View>
        </View>
      </View>
      {
        <View style={styles.bodyContainer}>
          {isValidElement(renderChildren[activeStep]) && cloneElement(renderChildren[activeStep])}
        </View>
      }
    </SafeAreaView>
  );
};

export default StepperFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  stepIndicatorOuter: {
    zIndex: -1,
    position: 'absolute',
    alignSelf: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
  stepIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});
