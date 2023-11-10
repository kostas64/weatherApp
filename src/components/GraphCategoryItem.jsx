import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {images} from '../assets/images';

const GraphCategoryItem = ({label, img, isChecked, isLast, setSelected}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setSelected(label)}
        style={styles.container}>
        <View style={styles.rowCenter}>
          {isChecked ? (
            <Image source={images.tick} style={styles.tick} />
          ) : (
            <View style={styles.empty} />
          )}
          <CText style={styles.label}>{label}</CText>
        </View>
        <Image source={img} style={styles.icon} />
      </TouchableOpacity>
      {!isLast && <View style={styles.hr} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: 200,
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    width: wp(4),
    height: wp(4),
    tintColor: 'white',
  },
  empty: {
    width: wp(4),
    height: wp(4),
  },
  label: {
    paddingLeft: wp(2),
  },
  icon: {
    width: wp(6),
    height: wp(6),
    tintColor: 'white',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
});

export default GraphCategoryItem;
