import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors';
import SearchInput from './SearchInput';
import {images} from '../assets/images';

const Header = React.forwardRef(
  (
    {
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
    }, [addPressed, onBlur]);

    const onPressLeftIcon = React.useCallback(() => {
      !!onPressLeft && onPressLeft();
      setSearchPressed(true);
    }, [onPressLeft]);

    const onLeftIconPress = searchPressed ? onBlurSearch : onPressLeftIcon;

    return (
      <View style={[styles.container, {paddingTop}]}>
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
        <SearchInput
          label={label}
          value={value}
          setValue={setValue}
          onBlur={onBlurSearch}
          addPressed={addPressed}
          searchPressed={searchPressed}
        />

        {/* Right icon */}
        {!searchPressed && !!rightIcon ? (
          <TouchableOpacity onPress={onPressRight} style={styles.iconContainer}>
            <Image source={rightIcon} style={[styles.img, rightIconStyle]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyBox} />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
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
  emptyBox: {
    width: wp(10),
  },
});

export default Header;
