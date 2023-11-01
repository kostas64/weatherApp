import React, {useContext} from 'react';
import {images} from '../assets/images';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors} from '../assets/colors';
import Header from '../components/Header';
import {Context} from '../context/Context';
import OtherCities from '../components/OtherCities';
import Temperature from '../components/Temperature';
import BasicInfoBox from '../components/BasicInfoBox';
import TodayForecast from '../components/TodayForecast';
import {calcPrecipitation, getWeatherIconFromCode} from '../utils/Utils';

const Home = () => {
  const {forecastData} = useContext(Context);

  const weatherData = getWeatherIconFromCode(
    forecastData?.current?.weathercode,
  );

  return (
    <View style={styles.flex}>
      {/* Image & Backdrop */}
      <Image source={images.thunder} blurRadius={15} style={styles.img} />
      <View style={styles.backdrop} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* Header */}
          <Header label={'Sydney'} />

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
                humidity={Math.floor(
                  forecastData?.current?.relativehumidity_2m,
                )}
                windSpeed={Math.floor(forecastData?.current?.windspeed_10m)}
              />
            </View>
          )}
        </View>

        {/* Today's forecast */}
        {!!forecastData && <TodayForecast data={forecastData?.hourly} />}

        {/* Other Cities */}
        <OtherCities />
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
