import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const AnimTouch = Animated.createAnimatedComponent(TouchableOpacity);

const RemoveButton = ({onPress, itemPressed}) => {
  const posTop = useSharedValue(16);
  const posRight = useSharedValue(20);
  const lineWidth = useSharedValue(0);
  const circleWidth = useSharedValue(0);
  const circleHeight = useSharedValue(0);

  const isOpen =
    lineWidth.value === 10 &&
    circleHeight.value === 24 &&
    circleWidth.value === 24 &&
    posTop.value === 4 &&
    posRight.value === 14;

  const isClosed =
    lineWidth.value === 0 &&
    circleHeight.value === 0 &&
    circleWidth.value === 0 &&
    posTop.value === 16 &&
    posRight.value === 20;

  const containerAnimStyle = useAnimatedStyle(() => ({
    height: circleHeight.value,
    width: circleWidth.value,
    right: posRight.value,
    top: posTop.value,
  }));

  const lineAnimStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
  }));

  const closeButton = () => {
    posTop.value = withTiming(16, {duration: 150});
    posRight.value = withTiming(20, {duration: 150});
    lineWidth.value = withTiming(0, {duration: 150});
    circleWidth.value = withTiming(0, {duration: 150});
    circleHeight.value = withTiming(0, {duration: 150});
  };

  const animateButton = () => {
    if (isClosed) {
      posTop.value = withSpring(4);
      posRight.value = withSpring(14);
      lineWidth.value = withSpring(10);
      circleWidth.value = withSpring(24);
      circleHeight.value = withSpring(24);
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
    } else if (isOpen) {
      closeButton();
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
    }
  };

  if (itemPressed) {
    animateButton();
  }

  return (
    <AnimTouch
      hitSlop={styles.hitSlop}
      onPress={() => {
        closeButton();
        onPress();
      }}
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
