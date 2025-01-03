// -- REACT
import React, { FC, useEffect, useState } from 'react';
// -- TYPE
import { dragAndDrop } from './drag-drop';
// -- STYLE
import { dragAndDropStyle } from './dragDropStyle';
// -- GESTURE HANDLER
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
// -- REANIMATED
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withSpring
} from 'react-native-reanimated';
// -- REACT NATIVE
import { Dimensions, View, useWindowDimensions } from 'react-native';

// # CONTENT TYPE
type ContentType = {
  x: number;
  y: number;
};

export const DragDrop: FC<dragAndDrop> = ({
  children,
  onDrag,
  onDrop,
  childHeight,
  childWidth,
  dropOnCorner,
  margin,
  marginBottom,
  menuOpen,
  fullScreen
}) => {
  //# TAKE BASIC DIMENSIONS OF DEVICE
  const fullWidth: number = Dimensions.get('window').width;
  const fullHeight: number = Dimensions.get('window').height;
  // # CALC RIGHT HALF OF X AND Y BASED ON CHILDREN DIMENSIONS
  const halfWidth: number = Dimensions.get('window').width / 2 - childWidth / 2; //meno la metà della larghezza del rettangolo o elemento figlio (in questo caso è largo 100)
  const halfHeight: number = Dimensions.get('window').height / 2 - childHeight / 2; ///meno la metù dell'altezza del rettangolo o elemento filgio (in questo caso il rettangolo è alto 150)
  // # CALC CORNER
  const topLeftCorner: ContentType = { x: margin, y: margin }; //x:margin,y:margin
  const topRightCorner: ContentType = { x: fullWidth - childWidth - margin, y: margin }; //x: full height device - fullwidth child - margin, y: margin
  const bottomLeftCorner: ContentType = { x: margin, y: fullHeight - marginBottom - margin - childHeight }; // x: margin, y: fullHeight device - toolbar height - margin - full child heigt
  const bottomRightCorner: ContentType = {
    x: fullWidth - childWidth - margin,
    y: fullHeight - marginBottom - margin - childHeight
  }; // x: full height device - fullHeight child - margin, y: fullHeight device - toolbar height - margin - full child heigt
  // # STARTING POINT (CORNER BOTTOM-RIGHT)
  const x = useSharedValue(bottomRightCorner.x); // TOTAL DEVICE WIDTH - TOTAL CHILDERN WIDTH - MARGIN
  const y = useSharedValue(bottomRightCorner.y); // TOTAL HEIGHT - TOOLBAR HEIGHT - MARGIN - TOTAL CHILDREN HEIGT

  // # STATE
  const { width, height } = useWindowDimensions();
  const [_, setIsLandScape] = useState<boolean>(width > height);

  const drag = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContentType>({
    onStart: (event, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      // MOVE ELEMENT (DRAG)
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
      if (onDrag) {
        runOnJS(onDrag)(x.value, y.value);
      }
    },
    // # HERE CAN DECIDE WHERE COMPONENT WILL BE AT THE DRAG OFF
    onEnd: event => {
      // POSITION ELEMENT ON PRESS OFF (DROP)
      if (onDrop) {
        runOnJS(onDrop)(x.value, y.value);
      }
      if (dropOnCorner) {
        // TOP LEFT CORNER
        if (x.value < halfWidth && y.value < halfHeight - childHeight / 2) {
          x.value = withSpring(topLeftCorner.x, {
            stiffness: 80
          });
          y.value = withSpring(topLeftCorner.y, {
            stiffness: 80
          });
        }
        // TOP RIGHT CORNER
        else if (x.value > halfWidth && y.value < halfHeight - childHeight / 2) {
          x.value = withSpring(topRightCorner.x, {
            stiffness: 80
          });
          y.value = withSpring(topRightCorner.y, {
            stiffness: 80
          });
        }
        // BOTTOM LEFT CORNER
        else if (x.value < halfWidth && y.value > halfHeight - childHeight / 2) {
          x.value = withSpring(bottomLeftCorner.x, {
            stiffness: 80
          });
          y.value = withSpring(bottomLeftCorner.y, {
            stiffness: 80
          });
        }
        // BOTTOM RIGHT CORNER
        else if (x.value > halfWidth && y.value > halfHeight - childHeight / 2) {
          x.value = withSpring(bottomRightCorner.x, {
            stiffness: 80
          });
          y.value = withSpring(bottomRightCorner.y, {
            stiffness: 80
          });
        }
      }
    }
  });

  // # SIDE EFFECTS
  useEffect(() => {
    setIsLandScape(width > height);
    x.value = width - childWidth - margin;
    y.value = height - marginBottom - margin - childHeight;
    //eslint-disable-next-line
  }, [width, height]);

  useEffect(() => {
    if (menuOpen) {
      x.value = topRightCorner.x;
      y.value = topRightCorner.y;
    }
  }, [menuOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }]
    };
  });

  return (
    <>
      {!fullScreen ? (
        <PanGestureHandler onGestureEvent={drag}>
          <Animated.View style={[animatedStyle, dragAndDropStyle.container]}>{children}</Animated.View>
        </PanGestureHandler>
      ) : (
        <View style={dragAndDropStyle.fullScreen}>{children}</View>
      )}
    </>
  );
};
