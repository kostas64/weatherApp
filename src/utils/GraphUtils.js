import moment from 'moment';

export const formatData = (data, time, index) => {
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
