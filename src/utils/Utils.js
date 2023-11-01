import {lottie} from '../assets/lottie';

export const calcPrecipitation = forecastData => {
  const reducedValue = forecastData?.hourly?.precipitation_probability?.reduce(
    (acc, cur) => acc + cur,
    0,
  );
  const valueToPercentage = Math.floor(reducedValue / 100);

  return valueToPercentage;
};

export const getWeatherIconFromCode = code => {
  if (code === 0) {
    return {icon: lottie.sunny, description: 'Sunny'};
  } else if (code === 1) {
    return {icon: lottie.dayCloud, description: 'Mostly Sunny'};
  } else if (code === 2 || code === 3) {
    return {icon: lottie.dayManyClouds, description: 'Cloudy'};
  } else if (code === 45 || code === 48) {
    return {icon: lottie.foggy, description: 'Foggy'};
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
    return {icon: lottie.snowy, description: 'Snowy'};
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
    return {icon: lottie.rainy, description: 'Rainy'};
  } else if (code === 95 || code === 96 || code === 99) {
    return {icon: lottie.thunder, description: 'Storm'};
  }
};
