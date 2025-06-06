import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextStyle,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { useStepper } from "../hooks";
export interface StepIconProps {
  label?: string;
  labelStyle?: TextStyle;
  stepNumber?: number;
  isActiveStep?: boolean;
  isCompletedStep?: boolean;
  completedStepIconColor?: string;
  completeStepNumColor?: string;
  activeStepIconColor?: string;
  inactiveStepIconColor?: string;
  activeStepNumColor?: string;
  disabledStepNumColor?: string;
  showLabelAboveSteps?: boolean;
}

const StepIcon = ({
  label,
  labelStyle,
  stepNumber,
  isActiveStep,
  isCompletedStep,
  completedStepIconColor = "#4BB543",
  inactiveStepIconColor = "lightgray",
  activeStepIconColor = "#87CEEB",
  activeStepNumColor = "white",
  completeStepNumColor = "white",
  disabledStepNumColor = "black",
  showLabelAboveSteps = false,
}: StepIconProps) => {
  const { width } = useWindowDimensions();
  const { totalSteps } = useStepper();

  let stylesConfig: {
    circleStyle?: StyleProp<ViewStyle>;
    stepNum?: StyleProp<TextStyle>;
  } = {};

  if (isActiveStep) {
    stylesConfig = {
      circleStyle: {
        backgroundColor: activeStepIconColor,
        shadowColor: activeStepIconColor,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,

        elevation: 6,
      },
      stepNum: {
        color: activeStepNumColor,
        fontSize: 12,
      },
    };
  } else if (isCompletedStep) {
    stylesConfig = {
      circleStyle: {
        backgroundColor: completedStepIconColor,
      },
      stepNum: {
        color: completeStepNumColor,
        fontSize: 12,
      },
    };
  } else {
    stylesConfig = {
      circleStyle: {
        backgroundColor: inactiveStepIconColor,
      },
      stepNum: {
        color: disabledStepNumColor,
        fontSize: 12,
      },
    };
  }

  return (
    <View style={styles.stepIconContainer}>
      <View style={styles.stepIconInnerContainer}>
        {showLabelAboveSteps && (
          <View
            style={[
              styles.labelContainer,
              {
                paddingTop: "2%",
                alignItems: "center",
                flex: 1,
                height: (width * 10) / 100,
                maxHeight: 50,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                labelStyle,
                {
                  width:
                    totalSteps > 8 ? width / 7 - 4 : width / totalSteps - 4,
                  color: isActiveStep
                    ? labelStyle?.color
                      ? labelStyle?.color
                      : "black"
                    : "transparent",
                },
              ]}
              numberOfLines={2}
              minimumFontScale={0.9}
              adjustsFontSizeToFit={Platform.OS === "ios" ? true : false}
            >
              {label}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.stepIconCircleContainer,
            showLabelAboveSteps && {
              paddingBottom: "4%",
            },
          ]}
        >
          <View
            style={[
              {
                width: (width * 10) / 100,
                height: (width * 10) / 100,
                borderRadius: (width * 10) / 100 / 2,
                justifyContent: "center",
                alignItems: "center",
                maxHeight: 32,
                maxWidth: 32,
              },
              stylesConfig.circleStyle,
            ]}
          >
            <Text style={styles.circleText}>
              <Text style={stylesConfig?.stepNum}>{stepNumber}</Text>
            </Text>
          </View>
        </View>
        {!showLabelAboveSteps && (
          <View
            style={[
              styles.labelContainer,
              {
                alignItems: "center",
                flex: 1,
                height: (width * 10) / 100,
                maxHeight: 50,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                labelStyle,
                {
                  width:
                    totalSteps > 8 ? width / 7 - 4 : width / totalSteps - 4,
                  color: isActiveStep
                    ? labelStyle?.color
                      ? labelStyle?.color
                      : "black"
                    : "transparent",
                },
              ]}
              numberOfLines={2}
              minimumFontScale={0.9}
              adjustsFontSizeToFit={Platform.OS === "ios"}
            >
              {label}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default StepIcon;

const styles = StyleSheet.create({
  stepIconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIconInnerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIconCircleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 60,
    maxWidth: 60,
  },
  labelContainer: {
    width: "100%",
  },
  label: {
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
  },
  circleText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});
