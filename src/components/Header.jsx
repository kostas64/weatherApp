import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors';
import SearchInput from './SearchInput';
import {images} from '../assets/images';
import AnimatedFade from './AnimatedFade';
import {WIDTH, isIOS} from '../assets/constants';

const Header = React.forwardRef(
  (
    {
      animated,
      label,
      leftIcon,
      leftIconStyle,
      rightIcon,
      rightIconStyle,
      onPressLeft,
      onPressRight,
      onBlur,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const [value, setValue] = React.useState('');
    const [addPressed, setAddPressed] = React.useState(false);
    const [searchPressed, setSearchPressed] = React.useState(false);

    const paddingTop =
      insets.top > 40
        ? insets.top
        : insets.top > 30
        ? insets.top + wp(2)
        : insets.top > 20
        ? insets.top + wp(6)
        : wp(8);

    React.useImperativeHandle(ref, () => ({
      onLeftPress: () => {
        onLeftIconPress();
        setAddPressed(true);
      },
    }));

    const onBlurSearch = React.useCallback(() => {
      addPressed && setAddPressed(false);

      !!onBlur && onBlur();
      setValue('');
      setSearchPressed(false);
    }, [addPressed]);

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
        {!!leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            style={styles.iconContainer}>
            <Image
              source={searchPressed ? images.arrow : leftIcon}
              style={[
                styles.img,
                searchPressed && styles.backIconStyle,
                leftIconStyle,
              ]}
            />
          </TouchableOpacity>
        )}

        {/* City name */}
        {!searchPressed ? (
          <Text
            numberOfLines={1}
            style={[styles.label, isIOS && styles.lineHeight]}>
            {label}
          </Text>
        ) : (
          <SearchInput
            value={value}
            setValue={setValue}
            onBlur={onBlurSearch}
            addPressed={addPressed}
          />
        )}

        {/* Right icon */}
        {!searchPressed && !!rightIcon ? (
          <TouchableOpacity onPress={onPressRight} style={styles.iconContainer}>
            <Image source={rightIcon} style={[styles.img, rightIconStyle]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyBox} />
        )}
      </Wrapper>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
  },
  label: {
    color: 'white',
    fontSize: wp(4.5),
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
    textAlignVertical: 'center',
    width: WIDTH - 146,
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
