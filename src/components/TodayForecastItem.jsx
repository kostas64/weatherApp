import React from 'react';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {colors} from '../assets/colors';
import {getWeatherIconFromCode} from '../utils/Utils';

const TodayForecastItem = ({item, index, timeData, temperatureData}) => {
  const itemRef = React.useRef();

  const time = timeData?.[index];
  const icon = getWeatherIconFromCode(item)?.icon;
  const temperature = Math.floor(temperatureData?.[index]);

  React.useEffect(() => {
    let interaction;

    if (!!icon) {
      interaction = InteractionManager.runAfterInteractions(() => {
        itemRef.current?.play();
      });
    }

    return () => interaction?.cancel();
  }, [icon]);

  return (
    <View style={styles.itemContainer}>
      {/* Time */}
      <CText medium size={3}>
        {moment(time).format('h A')}
      </CText>

      {/* Weather animation */}
      {!!icon && (
        <LottieView
          ref={itemRef}
          style={styles.lottie}
          source={getWeatherIconFromCode(item)?.icon}
        />
      )}

      {/* Footer */}
      <CText bold>{`${temperature}°`}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: wp(2),
    borderRadius: wp(6),
    alignItems: 'center',
    paddingVertical: wp(4),
    paddingHorizontal: wp(3),
    backgroundColor: colors.darkBg,
  },
  lottie: {
    marginTop: wp(2),
    width: wp(11),
    height: wp(11),
  },
});

export default TodayForecastItem;
