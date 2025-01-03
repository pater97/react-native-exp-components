import {ViewStyle, TextStyle, GestureResponderEvent} from 'react-native'

export interface ButtonProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  paddingHorizontal?: number;
  paddingVertical?:number,
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  textTransform?:'uppercase' | 'capitalize' | 'none',
  disabledColor?:string,
  onPressColor?:string,
}