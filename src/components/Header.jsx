import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors} from '../assets/colors';
import {images} from '../assets/images';

const Header = ({label}) => {
  const insets = useSafeAreaInsets();
  const paddingTop =
    insets.top > 40
      ? insets.top
      : insets.top > 30
      ? insets.top + wp(2)
      : insets.top > 20
      ? insets.top + wp(6)
      : wp(8);

  return (
    <View style={[styles.container, {paddingTop}]}>
      {/* Left icon */}
      <View style={styles.iconContainer}>
        <Image source={images.menu} style={styles.img} />
      </View>

      {/* City name */}
      <Text style={styles.label}>{label}</Text>

      {/* Right icon */}
      <View style={styles.iconContainer}>
        <Image source={images.refresh} style={styles.img} />
      </View>
    </View>
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
