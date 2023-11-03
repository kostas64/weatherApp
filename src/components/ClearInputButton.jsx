import React from 'react';
import {images} from '../assets/images';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {isIOS} from '../assets/constants';

const ClearInputButton = ({onPress}) => {
  return (
    <TouchableOpacity
      hitSlop={styles.container}
      onPress={onPress}
      style={styles.center}>
      <Image source={images.close} style={styles.img} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
  hitSlop: {
    top: wp(3),
    right: wp(3),
    bottom: wp(3),
    left: wp(3),
  },
  img: {
    top: isIOS ? -3 : 0,
    tintColor: '#c3c3c3',
    width: wp(5),
    height: wp(5),
  },
});

export default ClearInputButton;
