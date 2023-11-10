import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {RefreshControl, View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import Header from '../components/Header';
import {Context} from '../context/Context';
import Loading from '../components/Loading';
import AddButton from '../components/AddButton';
import YourPlaces from '../components/YourPlaces';
import Temperature from '../components/Temperature';
import SettingsBox from '../components/SettingsBox';
import AnimatedFade from '../components/AnimatedFade';
import BasicInfoBox from '../components/BasicInfoBox';
import TodayForecast from '../components/TodayForecast';
import {calcPrecipitation, getWeatherIconFromCode} from '../utils/Utils';

const Home = () => {
  const pressRef = React.useRef();
  const settingsRef = React.useRef();
  const isFocused = useIsFocused();
  const opacity = useSharedValue(1);
  const opacityHeader = useSharedValue(1);

  const {forecastData, loadingApi, forecastApi, placesApi, selectedPlace} =
    React.useContext(Context);

  const dataCode = forecastData?.current?.weathercode;

  const weatherData = getWeatherIconFromCode(dataCode, moment());
  const showLoading = loadingApi || !forecastData?.length === 0 || !weatherData;

  const fade = (shared, toValue, duration) => {
    shared.value = withTiming(toValue, {
      duration,
    });
  };

  const onPressAdd = () => {
    fade(opacity, 0, 300);
    pressRef?.current?.onLeftPress();
  };

  const onPressForecast = () => {
    //Close metrics if open
    settingsRef?.current?.closeIfOpen();

    //Fade off main screen
    fade(opacityHeader, 0, 150);
  };

  const onPressLeftIcon = () => {
    //Close metrics if open
    settingsRef?.current?.closeIfOpen();
    fade(opacity, 0, 300);
  };

  const onRefresh = () => {
    forecastApi();
    placesApi();
  };

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacityHeader.value,
  }));

  const animScrollStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    isFocused && fade(opacity, 1, 450);
    !isFocused && fade(opacity, 0, 150);
  }, [isFocused]);

  if (showLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={animStyle}>
        <Header
          ref={pressRef}
          animated
          label={selectedPlace?.city}
          onPressLeft={onPressLeftIcon}
          onBlur={() => fade(opacity, 1, 300)}
          leftIcon={images.search}
          rightIcon={images.settings}
          onPressRight={() => settingsRef?.current?.onPress()}
        />
      </Animated.View>

      {/* Change unit - Celsius - Fahrenheit */}
      <View style={styles.settingsBoxContainer}>
        <SettingsBox ref={settingsRef} />
      </View>

      <Animated.ScrollView
        style={animScrollStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loadingApi} onRefresh={onRefresh} />
        }>
        {/* Button when place is not in "Your Places" */}
        <AnimatedFade containerStyle={{zIndex: 100}}>
          <AddButton />
        </AnimatedFade>

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
          onPress={onPressForecast}
          onPressBack={() => fade(opacityHeader, 1, 150)}
        />

        {/* Other Cities */}
        <YourPlaces animated onPressAdd={onPressAdd} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10000000,
  },
  settingsBoxContainer: {
    zIndex: 10000,
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
