import React from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import {colors} from '../assets/colors';
import BasicInfoBoxItem from './BasicInfoBoxItem';

const BasicInfoBox = ({precipitation, humidity, windSpeed, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <BasicInfoBoxItem
        icon={images.umbrella}
        value={`${precipitation}%`}
        label={'Precipitation'}
      />
      <BasicInfoBoxItem
        icon={images.drop}
        value={`${humidity}%`}
        label={'Humidity'}
      />
      <BasicInfoBoxItem
        icon={images.wind}
        value={`${windSpeed}km/h`}
        label={'Wind Speed'}
        tintColor={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(4),
    paddingHorizontal: wp(6),
    marginHorizontal: wp(6),
    borderRadius: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBg,
  },
});

export default BasicInfoBox;
