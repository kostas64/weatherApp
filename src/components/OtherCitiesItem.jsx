import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {colors} from '../assets/colors';

const OtherCitiesItem = ({item, index}) => {
  return (
    <View key={index} style={styles.container}>
      {/* Weather animation */}
      <LottieView autoPlay source={item.lottie} style={styles.lottie} />

      {/*  City & Desc & Temperature */}
      <View style={styles.spaceHorizontal}>
        <CText bold>{item.city}</CText>
        <CText size={3}>{item.desc}</CText>
      </View>
      <CText>
        <CText bold size={6}>
          {item.temperature}
        </CText>
        <CText size={6}>°</CText>
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: wp(3),
    paddingLeft: wp(2),
    paddingRight: wp(6),
    borderRadius: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.darkBg,
  },
  spaceHorizontal: {
    marginLeft: wp(3),
    marginRight: wp(8),
  },
  lottie: {
    top: wp(1),
    width: wp(16),
    height: wp(18),
  },
});

export default OtherCitiesItem;
