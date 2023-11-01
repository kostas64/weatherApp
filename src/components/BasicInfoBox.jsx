import React from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import {colors} from '../assets/colors';
import BasicInfoBoxItem from './BasicInfoBoxItem';

const BasicInfoBox = () => {
  return (
    <View style={styles.container}>
      <BasicInfoBoxItem
        icon={images.umbrella}
        value={'30%'}
        label={'Precipitation'}
      />
      <BasicInfoBoxItem icon={images.drop} value={'30%'} label={'Humidity'} />
      <BasicInfoBoxItem
        icon={images.wind}
        value={'12km/h'}
        label={'Wind Speed'}
        tintColor={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(6),
    marginHorizontal: wp(6),
    borderRadius: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBg,
  },
});

export default BasicInfoBox;
