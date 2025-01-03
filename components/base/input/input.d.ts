import {  StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { ComponentProps, RefObject } from 'react';

type ValidationType = "email" | "password" | "username" | undefined;
type KeyboardType =
  | "default"
  | "number-pad"
  | "decimal-pad"
  | "numeric"
  | "email-address"
  | "phone-pad";

export interface InputProps extends ComponentProps<typeof TextInput> {
  onChangeText: (text: string, validationType?: ValidationType) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  //@ts-ignore
  entering?: Animated.Node<number>;
  inputRef?: RefObject<TextInput>;
  editable?:boolean;
  exitAnimation?:boolean;
  entryAnimation?:boolean;
  isValid?:boolean;
  placeholder?:string;
  keyboardType?:KeyboardType;
  selectionColor?:'string';
}
