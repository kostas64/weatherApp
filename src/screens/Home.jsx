import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
  const opacityHeader = useSharedValue(1);

  const {forecastData, loadingApi} = useContext(Context);
  const dataCode = forecastData?.current?.weathercode;

  const weatherData = getWeatherIconFromCode(dataCode);
  const showLoading = loadingApi || !forecastData?.length === 0 || !weatherData;

  const fade = (shared, toValue, duration) => {
    shared.value = withTiming(toValue, {
      duration,
    });
  };

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacityHeader.value,
  }));

  useEffect(() => {
    isFocused && fade(opacity, 1, 450);
    !isFocused && fade(opacity, 0, 150);
  }, [isFocused]);

  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Header */}
      <Animated.View style={animStyle}>
        <Header
          animated
          label={'Sydney'}
          onPressLeft={() => fade(opacity, 0, 300)}
          onBlur={() => fade(opacity, 1, 300)}
          leftIcon={images.search}
          rightIcon={images.settings}
        />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{opacity}}>
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
        <TodayForecast
          data={forecastData?.hourly}
          onPress={() => fade(opacityHeader, 0, 150)}
          onPressBack={() => fade(opacityHeader, 1, 150)}
        />

        {/* Other Cities */}
        <OtherCities animated />
      </Animated.ScrollView>
    </>
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
