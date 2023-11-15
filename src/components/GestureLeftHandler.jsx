import React from 'react';

import {
  State,
  Directions,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const GestureHandler = ({
  direction,
  onSwipeAction,
  activeOffsetX,
  children,
}) => {
  const swipeRef = React.useRef();

  const swipeHandler = e => {
    const event = e.nativeEvent;
    if (event.oldState === State.ACTIVE && event.state === State.END) {
      if (
        Math.abs(event.translationX) > Math.abs(event.translationY) &&
        event.translationX > 0
      ) {
        if (direction === Directions.RIGHT) {
          !!onSwipeAction && onSwipeAction();
        }
      } else if (
        Math.abs(event.translationX) > Math.abs(event.translationY) &&
        event.translationX < 0
      ) {
        if (direction === Directions.LEFT) {
          !!onSwipeAction && onSwipeAction();
        }
      } else if (
        event.translationY > 0 &&
        event.translationY > Math.abs(event.translationX)
      ) {
        if (direction === Directions.DOWN) {
          !!onSwipeAction && onSwipeAction();
        }
      } else if (
        event.translationY < 0 &&
        Math.abs(event.translationY) > Math.abs(event.translationX)
      ) {
        if (direction === Directions.UP) {
          !!onSwipeAction && onSwipeAction();
        }
      }
    }
  };

  return (
    <PanGestureHandler
      activeOffsetX={activeOffsetX}
      ref={swipeRef}
      onHandlerStateChange={swipeHandler}>
      {children}
    </PanGestureHandler>
  );
};

export default GestureHandler;
