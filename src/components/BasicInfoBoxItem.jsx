import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';

const BasicInfoBoxItem = ({icon, tintColor, label, value}) => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <Image source={icon} style={[styles.icon, !!tintColor && {tintColor}]} />

      {/* Value */}
      <CText bold style={styles.value}>
        {value}
      </CText>

      {/* Label */}
      <CText medium size={3} style={styles.label}>
        {label}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: wp(7),
    height: wp(7),
  },
  value: {
    paddingTop: wp(2),
  },
  label: {
    paddingTop: wp(1),
  },
});

export default BasicInfoBoxItem;
