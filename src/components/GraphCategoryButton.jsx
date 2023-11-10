import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import {colors} from '../assets/colors';

const GraphCategoryButton = ({selected, animateList}) => {
  const getIcon = React.useCallback(() => {
    switch (selected) {
      case 'Temperature':
        return images.temperature;
      case 'Wind Speed':
        return images.wind;
      case 'Humidity':
        return images.humidity;
      case 'Precipitation':
        return images.precipitation;
      default:
        return images.temperature;
    }
  }, [selected]);

  return (
    <Pressable onPress={animateList} style={styles.container}>
      <Image source={getIcon()} style={styles.icon} />
      <Image source={images.arrow} style={styles.arrow} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 38,
    paddingHorizontal: wp(2),
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(5),
    justifyContent: 'space-evenly',
    backgroundColor: colors.fallback,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    width: wp(4),
    height: wp(4),
    tintColor: 'white',
  },
  arrow: {
    width: wp(4),
    height: wp(6),
    tintColor: 'white',
    transform: [{rotate: '90deg'}],
  },
});

export default GraphCategoryButton;
