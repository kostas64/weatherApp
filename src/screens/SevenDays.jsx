import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import {colors} from '../assets/colors';
import Header from '../components/Header';
import TomorrowBox from '../components/TomorrowBox';
import TomorrowList from '../components/TomorrowList';

const SevenDays = ({navigation, route}) => {
  const {onPressBack} = route?.params || {};

  const leftIconStyle = {
    width: wp(10),
    height: wp(10),
    transform: [
      {
        rotate: '180deg',
      },
    ],
  };

  const onPressLeftIcon = () => {
    !!onPressBack && onPressBack();
    navigation.pop();
  };

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header
        label={'6 Days'}
        leftIcon={images.arrow}
        leftIconStyle={leftIconStyle}
        onPressLeft={onPressLeftIcon}
      />

      {/* Tomorrow Box */}
      <View style={styles.tomorrowContainer}>
        <TomorrowBox />
      </View>

      {/* 5 days forecast */}
      <TomorrowList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    backgroundColor: colors.lightBg,
    width: '100%',
    height: '100%',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tomorrowContainer: {
    paddingTop: wp(6),
  },
});

export default SevenDays;
