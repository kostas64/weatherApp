import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {images} from '../assets/images';
import {colors} from '../assets/colors';
import {lottie} from '../assets/lottie';
import {Context} from '../context/Context';
import {ToastContext} from '../context/ToastContext';

const AnimTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AddButton = () => {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(1);
  const {setToast} = React.useContext(ToastContext);
  const {yourPlaces, selectedPlace, setYourPlaces} = React.useContext(Context);

  const itemExistInFavourite = yourPlaces.some(
    place => place.city === selectedPlace.city,
  );

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (itemExistInFavourite || yourPlaces.length >= 10) {
    return null;
  }

  const animateButton = () => {
    setToast({city: selectedPlace.city, top: insets.top});

    opacity.value = withTiming(0, {duration: 650});

    const newPlace = {
      city: selectedPlace?.city,
      latitude: selectedPlace?.latitude,
      longitude: selectedPlace?.longitude,
      lottie: lottie.dayCloud, //We add mock data
      temperature: 10, //So to create the field
      desc: 'Mostly Sunny', //Will be calculated from api
    };

    setYourPlaces(old => [newPlace, ...old]);
  };

  return (
    <AnimTouchable
      onPress={animateButton}
      style={[styles.container, animStyle]}>
      <Image source={images.cross} style={styles.img} />
    </AnimTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: wp(6),
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: colors.darkBg,
    marginVertical: hp(1),
  },
  img: {
    tintColor: 'white',
    width: wp(3),
    height: wp(4),
    transform: [{rotate: '45deg'}],
  },
});

export default AddButton;
