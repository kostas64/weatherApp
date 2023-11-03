import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors';
import AnimatedFade from './AnimatedFade';

const Header = ({
  animated,
  label,
  leftIcon,
  leftIconStyle,
  rightIcon,
  rightIconStyle,
  onPressLeft,
  onPressRight,
}) => {
  const insets = useSafeAreaInsets();

  const paddingTop =
    insets.top > 40
      ? insets.top
      : insets.top > 30
      ? insets.top + wp(2)
      : insets.top > 20
      ? insets.top + wp(6)
      : wp(8);

  const Wrapper = animated ? AnimatedFade : View;

  return (
    <Wrapper
      style={[styles.container, {paddingTop}]}
      containerStyle={[styles.container, {paddingTop}]}>
      {/* Left icon */}
      <TouchableOpacity onPress={onPressLeft} style={styles.iconContainer}>
        <Image source={leftIcon} style={[styles.img, leftIconStyle]} />
      </TouchableOpacity>

      {/* City name */}
      <Text style={styles.label}>{label}</Text>

      {/* Right icon */}
      <TouchableOpacity onPress={onPressRight} style={styles.iconContainer}>
        <Image source={rightIcon} style={[styles.img, rightIconStyle]} />
      </TouchableOpacity>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
  },
  label: {
    color: 'white',
    fontSize: wp(4),
    fontFamily: 'Gilroy-Bold',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: colors.darkBg,
  },
  img: {
    tintColor: 'white',
    width: wp(6),
    height: wp(6),
  },
});

export default Header;
