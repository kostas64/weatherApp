import React from 'react';
import {BackHandler} from 'react-native';

export const useBottomSheetBackHandler = bottomSheetRef => {
  const backHandlerSubscriptionRef = React.useRef(null);
  const handleSheetPositionChange = React.useCallback(
    index => {
      const isBottomSheetVisible = index >= 0;
      if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
        // setup the back handler if the bottom sheet is right in front of the user
        backHandlerSubscriptionRef.current = BackHandler.addEventListener(
          'hardwareBackPress',
          () => {
            bottomSheetRef.current?.close();
            return true;
          },
        );
      } else if (!isBottomSheetVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [bottomSheetRef, backHandlerSubscriptionRef],
  );

  return {handleSheetPositionChange};
};
