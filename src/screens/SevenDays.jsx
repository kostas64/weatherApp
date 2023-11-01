import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import {colors} from '../assets/colors';
import Header from '../components/Header';
import TomorrowBox from '../components/TomorrowBox';
import TomorrowList from '../components/TomorrowList';

const SevenDays = ({navigation}) => {
  const leftIconStyle = {
    width: wp(10),
    height: wp(10),
    transform: [
      {
        rotate: '180deg',
      },
    ],
  };

  return (
    <View style={styles.flex}>
      {/* Image & Backdrop */}
      <Image source={images.thunder} blurRadius={15} style={styles.img} />
      <View style={styles.backdrop} />

      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          isDark
          label={'6 Days'}
          leftIcon={images.arrow}
          leftIconStyle={leftIconStyle}
          rightIcon={images.dots}
          onPressLeft={() => navigation.pop()}
        />

        {/* Tomorrow Box */}
        <View style={styles.tomorrowContainer}>
          <TomorrowBox />
        </View>

        {/* 5 days forecast */}
        <TomorrowList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    backgroundColor: colors.darkBg,
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
