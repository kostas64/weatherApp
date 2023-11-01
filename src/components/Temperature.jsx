import React from 'react';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';

const Temperature = ({weather, animation, temperature}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <CText style={styles.label}>{weather}</CText>

      {/* Temperature & Unit */}
      <View style={styles.absoluteCenter}>
        <CText bold size={40} style={[styles.temp, styles.textShadow]}>
          {temperature}
        </CText>
        <CText bold size={16} style={[styles.unit, styles.textShadow]}>
          °
        </CText>
      </View>

      {/* Lottie */}
      <LottieView autoPlay source={animation} style={styles.lottie} />

      {/* Date */}
      <CText style={styles.date}>{moment().format('dddd, DD MMMM ')}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    alignSelf: 'center',
  },
  absoluteCenter: {
    position: 'absolute',
    justifyContent: 'center',
  },
  temp: {
    lineHeight: wp(50),
  },
  unit: {
    right: -wp(6),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: wp(4),
    lineHeight: wp(25),
  },
  lottie: {
    position: 'absolute',
    top: wp(22),
    width: wp(36),
    height: wp(36),
  },
  lottieSunny: {
    position: 'absolute',
    top: wp(24),
    width: wp(46),
    height: wp(46),
  },
  date: {
    position: 'absolute',
    top: wp(50),
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20,
  },
});

export default Temperature;
