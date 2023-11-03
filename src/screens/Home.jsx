import {View, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Animated, {withTiming, useSharedValue} from 'react-native-reanimated';

import {images} from '../assets/images';
import Header from '../components/Header';
import {Context} from '../context/Context';
import Loading from '../components/Loading';
import OtherCities from '../components/OtherCities';
import Temperature from '../components/Temperature';
import AnimatedFade from '../components/AnimatedFade';
import BasicInfoBox from '../components/BasicInfoBox';
import TodayForecast from '../components/TodayForecast';
import {calcPrecipitation, getWeatherIconFromCode} from '../utils/Utils';

const Home = () => {
  const isFocused = useIsFocused();
  const opacity = useSharedValue(1);
  const {forecastData, loadingApi} = useContext(Context);
  const dataCode = forecastData?.current?.weathercode;

  const weatherData = getWeatherIconFromCode(dataCode);
  const showLoading = loadingApi || !forecastData?.length === 0 || !weatherData;

  useEffect(() => {
    opacity.value = withTiming(isFocused ? 1 : 0, {
      duration: isFocused ? 450 : 150,
    });
  }, [isFocused]);

  if (showLoading) {
    return <Loading />;
  }

  return (
    <Animated.ScrollView showsVerticalScrollIndicator={false} style={{opacity}}>
      {/* Header */}
      <Header
        animated
        label={'Sydney'}
        leftIcon={images.menu}
        rightIcon={images.settings}
      />

      {/* Temperature */}
      <AnimatedFade containerStyle={styles.temperatureContainer}>
        <Temperature
          weather={weatherData?.description}
          animation={weatherData?.icon}
          temperature={Math.floor(forecastData?.current?.temperature_2m)}
        />
      </AnimatedFade>

      {/* Basic info box */}
      <View style={styles.basicInfoContainer}>
        <BasicInfoBox
          animated
          precipitation={calcPrecipitation(forecastData)}
          humidity={Math.floor(forecastData?.current?.relativehumidity_2m)}
          windSpeed={Math.floor(forecastData?.current?.windspeed_10m)}
        />
      </View>

      {/* Today's forecast */}
      <TodayForecast data={forecastData?.hourly} />

      {/* Other Cities */}
      <OtherCities animated />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
