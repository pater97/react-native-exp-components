// -- REACT
import { FC } from "react";
// -- COMPONENTS
import { TextInput } from "react-native";
import { useRef } from "react";
// -- TYPE
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { InputProps } from "./input";
// -- STYLE
import { style } from "./input-style";

export const Input: FC<InputProps> = ({
  onChangeText,
  keyboardType = "default",
  contentContainerStyle,
  editable = true,
  entryAnimation,
  exitAnimation,
  icon,
  inputRef,
  isValid=true,
  placeholder,
  selectionColor='black',
}) => {
  // # REF
  const valueRef = useRef<string>("");

  // # HANDLER
  const handleText = (text: string) => {
    valueRef.current = text;
    onChangeText(text);
  };

  return (
    <Animated.View
      entering={entryAnimation ? FadeInLeft : undefined}
      exiting={exitAnimation ? FadeOutRight : undefined}
      style={[
        style.container,
        { borderBottomColor: editable ? "#333" : "#07AC36" },
        contentContainerStyle,
        editable === false && {
          backgroundColor: "rgba(153,153,153,0.1)",
        },
        !isValid
          ? style.errorBorder
          : style.borderBottom,
      ]}
    >
      <TextInput
        ref={inputRef}
        keyboardType={keyboardType}
        onChangeText={handleText}
        style={[style.input, { color: editable ? "black" : "#FEFEFE" }]}
        placeholder={placeholder}
        selectionColor={selectionColor}
      />

      {icon && icon}
    </Animated.View>
  );
};
