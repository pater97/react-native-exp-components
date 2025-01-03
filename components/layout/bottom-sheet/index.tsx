import React from 'react';

// -- COMPONENTS
import { DimensionValue, Dimensions, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';


// -- TYPES
export interface ThemeProps {
  primary: string;
  secondary: string;
  activeColor: string;
  textColor: string;
  disabledColor: string;
  buttonColor: string;
  iconColor: string;
  errorColor: string;
}

type BottomSheetProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  height?: DimensionValue;
  transparent: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  noPadding?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const BottomSheet = ({
  onClose,
  isOpen = false,
  children,
  height = Dimensions.get('window').height / 2,
  transparent,
  contentStyle,
  noPadding
}: BottomSheetProps) => {
  // # HOOKS
  const offset = useSharedValue(0);

  // # FUNCTIONS
  const toggleSheet = () => {
    onClose();
    offset.value = 0;
  };

  // # CONSTANTS
  const heightToUse = (height as number) || ((Dimensions.get('window').height / 2) as number);
  const pan = Gesture.Pan()
    .onChange(event => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-20, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < heightToUse / 2) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(height as number, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }]
  }));

  if (!isOpen) return null;

  return (
    <>
      <AnimatedPressable
        style={[style.backdrop, transparent && style.bg, contentStyle]}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[style.sheet, translateY, transparent && style.bg]}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </AnimatedPressable>
    </>
  );
};

const style = 
  StyleSheet.create({
    sheet: {
      padding: 16,
      width: '100%',
      position: 'absolute',
      bottom: -20 * 1.1,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      zIndex: 1,
      backgroundColor: 'grey'
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1
    },
    bg: {
      backgroundColor: 'transparent'
    }
  });
