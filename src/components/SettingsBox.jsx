import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {colors} from '../assets/colors';
import {images} from '../assets/images';
import {Context} from '../context/Context';

const SettingsBox = React.forwardRef((_, ref) => {
  const opacity = useSharedValue(0);

  const {isCelsius, setIsCelsius} = React.useContext(Context);

  React.useImperativeHandle(ref, () => ({
    onPress: () => {
      opacity.value > 0 ? animateClosing() : animateOpening();
    },
    closeIfOpen: () => opacity.value > 0 && animateClosing(),
  }));

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const onPress = React.useCallback(unit => {
    if (isCelsius && unit === 'c') {
      return;
    }

    if (!isCelsius && unit === 'f') {
      return;
    }

    animateClosing();
    setIsCelsius(unit === 'c' ? true : false);
  }, []);

  const animateClosing = React.useCallback(() => {
    opacity.value = withTiming(0, {duration: 250});
  }, []);

  const animateOpening = React.useCallback(() => {
    opacity.value = withTiming(1, {duration: 250});
  }, []);

  return (
    <Animated.View style={[styles.container, animStyle]}>
      {['c', 'f'].map(unit => (
        <TouchableOpacity
          key={unit}
          onPress={() => onPress(unit)}
          style={styles.rowCenterBetween}>
          <View style={styles.rowCenter}>
            {isCelsius === (unit === 'c') ? (
              <Image source={images.tick} style={styles.img} />
            ) : (
              <View style={styles.empty} />
            )}
            <CText size={5} style={styles.padVertical}>
              {unit === 'c' ? 'Celsius' : 'Fahrenheit'}
            </CText>
          </View>
          <CText size={5} style={styles.unitWidth}>
            {unit === 'c' ? '°C' : '°F'}
          </CText>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    right: wp(6),
    position: 'absolute',
    width: 220,
    height: 100,
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(4),
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: colors.darkBgFull,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padVertical: {
    paddingVertical: wp(2),
  },
  unitWidth: {
    width: 24,
  },
  img: {
    width: wp(4),
    height: wp(4),
    marginRight: wp(2),
    tintColor: 'white',
  },
  empty: {
    width: wp(4),
    marginRight: wp(2),
  },
});

export default SettingsBox;
