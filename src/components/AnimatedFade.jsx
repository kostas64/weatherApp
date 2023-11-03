import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';

const AnimatedFade = ({children, containerStyle}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)} style={containerStyle}>
      {children}
    </Animated.View>
  );
};

export default AnimatedFade;
