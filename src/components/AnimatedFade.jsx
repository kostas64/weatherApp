import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';

const AnimatedFade = ({children, containerStyle, onFinish}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(250)
        .duration(500)
        .withCallback(finised => {
          if (finised) {
            !!onFinish && onFinish();
          }
        })}
      style={containerStyle}>
      {children}
    </Animated.View>
  );
};

export default AnimatedFade;
