import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useContext} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';

import CText from './Text';
import {colors} from '../assets/colors';
import BasicInfoBox from './BasicInfoBox';
import {Context} from '../context/Context';
import {getWeatherIconFromCode} from '../utils/Utils';

const TomorrowBox = () => {
  const {forecastData: data} = useContext(Context);

  const dailyData = data?.daily;
  const weatherCode = dailyData?.weathercode?.[1];
  const precipitation = dailyData?.precipitation_probability_max?.[1];
  const humidityData = data?.hourly?.relativehumidity_2m;
  const windSpeed = Math.floor(dailyData?.windspeed_10m_max?.[1]);
  const tempMin = Math.floor(dailyData?.temperature_2m_min?.[1]);
  const tempMax = Math.floor(dailyData?.temperature_2m_max?.[1]);
  const codeData = getWeatherIconFromCode(weatherCode);
  const humidity = Math.floor(
    humidityData?.slice(24, 48)?.reduce((acc, cur) => acc + cur, 0) / 24,
  );

  if (!weatherCode) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Weather animtation  & Temperatures */}
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <LottieView autoPlay source={codeData?.icon} style={styles.lottie} />
          <CText style={[styles.tempMax, styles.textShadow]}>
            <CText bold size={24}>
              {tempMax}
            </CText>
            <CText
              semiBold
              size={8}
              style={styles.textShadow}>{`/${tempMin}°`}</CText>
          </CText>
        </View>
        <View style={styles.rightContainer}>
          <CText>Tomorrow</CText>
          <CText semiBold size={6} style={styles.tomorrowWeather}>
            {codeData?.description}
          </CText>
        </View>
      </View>

      {/* Card Footer */}
      <View style={styles.basicInfoContainer}>
        <BasicInfoBox
          precipitation={precipitation}
          humidity={humidity}
          windSpeed={windSpeed}
          containerStyle={styles.containerStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    borderRadius: wp(8),
    marginHorizontal: wp(6),
    overflow: 'hidden',
    backgroundColor: colors.darkBg,
  },
  leftContainer: {
    width: wp(60),
  },
  rightContainer: {
    justifyContent: 'center',
    width: wp(27),
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  tempMax: {
    position: 'absolute',
    top: hp(10),
    left: wp(14),
  },
  tomorrowWeather: {
    paddingTop: wp(2),
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  basicInfoContainer: {
    paddingTop: wp(4),
    paddingBottom: wp(6),
  },
  lottie: {
    left: -wp(4),
    width: wp(46),
    height: wp(50),
  },
});

export default TomorrowBox;
