import {DefaultTheme} from '@react-navigation/native';

import {images} from '../assets/images';
import {lottie} from '../assets/lottie';
import {getYourPlacesTemp} from '../api';

export const calcPrecipitation = forecastData => {
  const reducedValue = forecastData?.hourly?.precipitation_probability?.reduce(
    (acc, cur) => acc + cur,
    0,
  );
  const valueToPercentage = Math.floor(reducedValue / 100);

  return valueToPercentage;
};

export const getTemps = async (mockPlaces, setYourPlaces) => {
  const places = [...mockPlaces];

  const promises = mockPlaces.map(async item => {
    const data = await getYourPlacesTemp(item);
    return data;
  });

  const result = await Promise.all(promises);

  result.map((item, index) => {
    places[index].temperature = item?.current?.temperature_2m;
    places[index].lottie = getWeatherIconFromCode(
      item?.current?.weathercode,
    )?.icon;
    places[index].desc = getWeatherIconFromCode(
      item?.current?.weathercode,
    )?.description;
  });

  setYourPlaces(places);
};

export const getWeatherIconFromCode = code => {
  if (code === 0) {
    return {icon: lottie.sunny, description: 'Sunny', img: images.sunny};
  } else if (code === 1 || code === 2 || code === 3) {
    return {
      icon: lottie.dayCloud,
      description: 'Mostly Sunny',
      img: images.cloudy,
    };
  } else if (code === 45 || code === 48) {
    return {icon: lottie.foggy, description: 'Foggy', img: images.foggy};
  } else if (
    code === 56 ||
    code === 57 ||
    code === 71 ||
    code === 73 ||
    code === 75 ||
    code === 77 ||
    code === 85 ||
    code === 86
  ) {
    return {icon: lottie.snowy, description: 'Snowy', img: images.snowy};
  } else if (
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 66 ||
    code === 67 ||
    code === 80 ||
    code === 81 ||
    code === 82
  ) {
    return {icon: lottie.rainy, description: 'Rainy', img: images.rainy};
  } else if (code === 95 || code === 96 || code === 99) {
    return {icon: lottie.thunder, description: 'Storm', img: images.thunder};
  }
};

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const query = {
  key: 'AIzaSyAjzvohgdGHwrXs5luSWvngxl3CrS4DXqQ',
  language: 'en',
};
