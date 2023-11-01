import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {images} from '../assets/images';

const TodayForecastListHeader = () => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate('SevenDays');

  return (
    <View style={styles.container}>
      <CText>Today</CText>
      <TouchableOpacity onPress={onPress} style={styles.rowCenter}>
        <CText>7-Day Forecast</CText>
        <Image source={images.arrow} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop: wp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
  },
  arrow: {
    width: wp(6),
    height: wp(6),
    tintColor: 'white',
  },
});

export default TodayForecastListHeader;
