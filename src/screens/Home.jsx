import React from 'react';
import {images} from '../assets/images';
import {View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors} from '../assets/colors';
import Header from '../components/Header';
import Temperature from '../components/Temperature';
import BasicInfoBox from '../components/BasicInfoBox';

const Home = () => {
  return (
    <View style={styles.flex}>
      {/* Image & Backdrop */}
      <Image source={images.thunder} blurRadius={15} style={styles.img} />
      <View style={styles.backdrop} />

      {/* Header */}
      <Header label={'Sydney'} />

      {/* Temperature */}
      <View style={styles.temperatureContainer}>
        <Temperature temperature={23} />
      </View>

      {/* Basic info box */}
      <View style={styles.basicInfoContainer}>
        <BasicInfoBox />
      </View>
    </View>
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
  temperatureContainer: {
    paddingTop: wp(4),
    height: wp(58),
  },
  basicInfoContainer: {
    paddingTop: wp(6),
  },
});

export default Home;
