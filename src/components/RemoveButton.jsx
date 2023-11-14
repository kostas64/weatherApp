import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

const AnimTouch = Animated.createAnimatedComponent(TouchableOpacity);

const RemoveButton = ({onPress, itemPressed}) => {
  const lineWidth = useSharedValue(0);
  const circleWidth = useSharedValue(0);
  const circleHeight = useSharedValue(0);

  const isOpen =
    lineWidth.value === 10 &&
    circleHeight.value === 24 &&
    circleWidth.value === 24;

  const isClosed =
    lineWidth.value === 0 &&
    circleHeight.value === 0 &&
    circleWidth.value === 0;

  const containerAnimStyle = useAnimatedStyle(() => ({
    height: circleHeight.value,
    width: circleWidth.value,
  }));

  const lineAnimStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
  }));

  const onPressRemove = () => {
    closeButton();
    onPress();
  };

  const closeButton = () => {
    lineWidth.value = withTiming(0, {duration: 150});
    circleWidth.value = withTiming(0, {duration: 150});
    circleHeight.value = withTiming(0, {duration: 150});
  };

  const animateButton = () => {
    if (isClosed) {
      lineWidth.value = withTiming(10, {duration: 300});
      circleWidth.value = withTiming(24, {duration: 300});
      circleHeight.value = withTiming(24, {duration: 300});
      ReactNativeHapticFeedback.trigger('impactMedium', options);
    } else if (isOpen) {
      closeButton();
      ReactNativeHapticFeedback.trigger('impactMedium', options);
    }
  };

  if (itemPressed) {
    animateButton();
  }

  return (
    <AnimTouch
      onPress={onPressRemove}
      hitSlop={styles.hitSlop}
      style={[styles.container, containerAnimStyle]}>
      <Animated.View style={[styles.line, lineAnimStyle]} />
    </AnimTouch>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#c0c0c0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(6),
    zIndex: 11111,
    right: 8,
    top: 4,
  },
  line: {
    height: 1,
    backgroundColor: 'white',
  },
  hitSlop: {
    top: wp(2),
    left: wp(2),
    right: wp(2),
    bottom: wp(2),
  },
});

export default RemoveButton;
