import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import React from 'react';
import CText from './Text';
import ReText from './ReText';

const GraphHeader = ({
  category,
  tempMin,
  tempMax,
  formattedText,
  rightText,
}) => {
  return (
    <View style={styles.container}>
      {/* First row */}
      <View style={[styles.rowCenter, styles.between]}>
        <View style={styles.rowCenter}>
          <CText size={6} bold color="black">
            {category}
          </CText>
        </View>
        <ReText text={formattedText} style={styles.label} />
      </View>

      {/* Second row */}
      <View style={styles.secondContainer}>
        <CText
          color="rgba(0,0,0,0.5)"
          style={styles.time}>{`H : ${tempMax}  L : ${tempMin}`}</CText>
        <ReText text={rightText} style={styles.time} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(6),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  label: {
    padding: 0,
    color: 'black',
    fontSize: 22,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    padding: 0,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 18,
    fontFamily: 'Gilroy-Medium',
  },
});

export default GraphHeader;
