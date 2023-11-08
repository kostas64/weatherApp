import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import React from 'react';
import CText from './Text';
import ReText from './ReText';

const GraphHeader = ({tempMin, tempMax, formattedText, rightText}) => {
  return (
    <View style={styles.container}>
      {/* First row */}
      <View style={[styles.rowCenter, styles.between]}>
        <View style={styles.rowCenter}>
          <CText size={5} bold color="black">
            {'Temperature'}
          </CText>
          <ReText text={formattedText} style={styles.label} />
        </View>
        <ReText text={rightText} style={styles.label} />
      </View>

      {/* Second row */}
      <CText color="grey">{`H : ${tempMax}  L : ${tempMin}`}</CText>
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
    fontSize: 18,
  },
});

export default GraphHeader;
