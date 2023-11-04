import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors';
import SearchInput from './SearchInput';
import {images} from '../assets/images';
import AnimatedFade from './AnimatedFade';
import {isIOS} from '../assets/constants';

const Header = ({
  animated,
  label,
  leftIcon,
  leftIconStyle,
  rightIcon,
  rightIconStyle,
  onPressLeft,
  onPressRight,
  onBlur,
}) => {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);

  const paddingTop =
    insets.top > 40
      ? insets.top
      : insets.top > 30
      ? insets.top + wp(2)
      : insets.top > 20
      ? insets.top + wp(6)
      : wp(8);

  const onBlurSearch = React.useCallback(() => {
    !!onBlur && onBlur();
    setValue('');
    setSearchPressed(false);
  }, []);

  const onPressLeftIcon = React.useCallback(() => {
    !!onPressLeft && onPressLeft();
    setSearchPressed(true);
  }, []);

  const onLeftIconPress = searchPressed ? onBlurSearch : onPressLeftIcon;

  const Wrapper = animated ? AnimatedFade : View;

  return (
    <Wrapper
      style={[styles.container, {paddingTop}]}
      containerStyle={[styles.container, {paddingTop}]}>
      {/* Left icon */}
      <TouchableOpacity onPress={onLeftIconPress} style={styles.iconContainer}>
        <Image
          source={searchPressed ? images.arrow : leftIcon}
          style={[
            styles.img,
            searchPressed && styles.backIconStyle,
            leftIconStyle,
          ]}
        />
      </TouchableOpacity>

      {/* City name */}
      {!searchPressed ? (
        <Text style={[styles.label, isIOS && styles.lineHeight]}>{label}</Text>
      ) : (
        <SearchInput value={value} setValue={setValue} onBlur={onBlurSearch} />
      )}

      {/* Right icon */}
      {!searchPressed ? (
        <TouchableOpacity onPress={onPressRight} style={styles.iconContainer}>
          <Image source={rightIcon} style={[styles.img, rightIconStyle]} />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyBox} />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
  },
  label: {
    color: 'white',
    fontSize: wp(5),
    fontFamily: 'Gilroy-Bold',
    textAlignVertical: 'center',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: colors.darkBg,
    marginVertical: hp(1),
  },
  backIconStyle: {
    width: wp(10),
    height: wp(10),
    transform: [{rotate: '180deg'}],
  },
  img: {
    tintColor: 'white',
    width: wp(5),
    height: wp(5),
  },
  lineHeight: {
    lineHeight: 56,
  },
  emptyBox: {
    width: wp(10),
  },
});

export default Header;
