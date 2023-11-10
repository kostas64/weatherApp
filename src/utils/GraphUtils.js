import moment from 'moment';

export const formatData = (selected, allData, time, index) => {
  const data =
    selected === 'Temperature'
      ? allData?.temperature_2m
      : selected === 'Humidity'
      ? allData?.relativehumidity_2m
      : selected === 'Precipitation'
      ? allData?.precipitation_probability
      : allData?.windspeed_10m;

  let array = [];
  const slicedData = data?.slice(index * 24, (index + 1) * 24);
  const slicedTime = time?.slice(index * 24, (index + 1) * 24);

  for (let i = 0; i < 24; i++) {
    array.push({
      time: moment(slicedTime?.[i]).format('HH:mm'),
      y: slicedData?.[i],
    });
  }

  return array;
};

export const getUnit = (selected, hideKm, withoutTicks) => {
  'worklet';

  switch (selected) {
    case 'Temperature':
      return '°';
    case 'Wind Speed':
      return hideKm ? '' : 'km/h';
    case 'Humidity':
      return withoutTicks ? '%' : `\'%\'`;
    case 'Precipitation':
      return withoutTicks ? '%' : `\'%\'`;
    default:
      return '°';
  }
};
