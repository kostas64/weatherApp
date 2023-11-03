import {useIsFocused} from '@react-navigation/native';
import {View, StyleSheet, Animated} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import Header from '../components/Header';
import {Context} from '../context/Context';
import OtherCities from '../components/OtherCities';
import Temperature from '../components/Temperature';
import BasicInfoBox from '../components/BasicInfoBox';
import TodayForecast from '../components/TodayForecast';
import {calcPrecipitation, getWeatherIconFromCode} from '../utils/Utils';

const Home = () => {
  const isFocused = useIsFocused();
  const {forecastData} = useContext(Context);
  const opacity = useRef(new Animated.Value(0)).current;
  const dataCode = forecastData?.current?.weathercode;

  const weatherData = getWeatherIconFromCode(dataCode);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isFocused ? 1 : 0,
      duration: isFocused ? 450 : 150,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <Animated.ScrollView showsVerticalScrollIndicator={false} style={{opacity}}>
      {/* Header */}
      <Header
        label={'Sydney'}
        leftIcon={images.menu}
        rightIcon={images.settings}
      />

      {/* Temperature */}
      {!!weatherData && (
        <View style={styles.temperatureContainer}>
          <Temperature
            weather={weatherData?.description}
            animation={weatherData?.icon}
            temperature={Math.floor(forecastData?.current?.temperature_2m)}
          />
        </View>
      )}

      {/* Basic info box */}
      {!!forecastData && (
        <View style={styles.basicInfoContainer}>
          <BasicInfoBox
            precipitation={calcPrecipitation(forecastData)}
            humidity={Math.floor(forecastData?.current?.relativehumidity_2m)}
            windSpeed={Math.floor(forecastData?.current?.windspeed_10m)}
          />
        </View>
      )}

      {/* Today's forecast */}
      {!!forecastData && <TodayForecast data={forecastData?.hourly} />}

      {/* Other Cities */}
      <OtherCities />
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
