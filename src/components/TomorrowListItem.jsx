import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import moment from 'moment';
import React, {useContext} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';

import CText from './Text';
import {Context} from '../context/Context';
import {getWeatherIconFromCode} from '../utils/Utils';

const TomorrowListItem = ({item, index}) => {
  const {forecastData: data} = useContext(Context);

  const dailyData = data?.daily;
  const time = moment(item).format('ddd');
  const weatherCode = dailyData?.weathercode?.[index];
  const codeData = getWeatherIconFromCode(weatherCode);
  const tempMin = Math.floor(dailyData?.temperature_2m_min?.[index + 2]);
  const tempMax = Math.floor(dailyData?.temperature_2m_max?.[index + 2]);
  const tempMinForm = tempMin >= 0 ? `+${tempMin}` : `-${tempMin}`;
  const tempMaxForm = tempMax >= 0 ? `+${tempMax}` : `-${tempMax}`;

  return (
    <>
      <View style={styles.container}>
        {/* Left container */}
        <CText size={5} style={styles.day}>
          {time}
        </CText>

        {/* Middle container */}
        <View style={styles.middleContainer}>
          {codeData?.icon && (
            <LottieView
              autoPlay
              source={codeData?.icon}
              style={styles.lottie}
            />
          )}
          <CText style={styles.descWidth}>{codeData?.description}</CText>
        </View>

        {/* Right container */}
        <View style={styles.tempsContainer}>
          <CText bold size={5}>{`${tempMaxForm}°`}</CText>
          <CText bold size={5}>{`${tempMinForm}°`}</CText>
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(1),
  },
  day: {
    width: wp(16),
  },
  middleContainer: {
    width: wp(42),
    flexDirection: 'row',
    alignItems: 'center',
  },
  lottie: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(2),
  },
  descWidth: {
    width: wp(25),
  },
  tempsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: hp(2),
  },
});

export default TomorrowListItem;
