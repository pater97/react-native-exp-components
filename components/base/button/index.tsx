// -- REAT
import { FC } from "react";
// -- RN
import { Pressable, Text } from "react-native";
// --TYPES
import { ButtonProps } from "./button";
// -- STYLES
import { styles } from "./button-style";

export const Button: FC<ButtonProps> = ({
  text,
  backgroundColor = "#007BFF",
  textColor = "#FFFFFF",
  borderColor,
  borderWidth = 1,
  borderRadius = 8,
  paddingHorizontal = 20,
  paddingVertical = 10,
  onPress,
  style,
  textStyle,
  disabled = false,
  disabledColor = "#B0B0B0",
  onPressColor = "#0056b3",
  textTransform = "capitalize",
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? disabledColor
            : pressed
            ? onPressColor
            : backgroundColor,
          borderColor: borderColor || backgroundColor,
          borderWidth,
          borderRadius,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            textTransform
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
