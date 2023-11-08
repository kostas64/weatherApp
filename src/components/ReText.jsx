import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({text: true});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = props => {
  const {text, style} = {style: {}, ...props};
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={[styles.baseStyle, style]}
      {...{animatedProps}}
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    color: 'black',
    fontFamily: 'Gilroy-Medium',
  },
});

export default ReText;
