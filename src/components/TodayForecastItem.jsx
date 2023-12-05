import React from 'react';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {colors} from '../assets/colors';
import {getWeatherIconFromCode} from '../utils/Utils';

const TodayForecastItem = ({
  item,
  index,
  indexToScroll,
  timeData,
  temperatureData,
}) => {
  const itemRef = React.useRef();

  const time = timeData?.[index];
  const icon = getWeatherIconFromCode(item, time)?.icon;
  const temperature = Math.floor(temperatureData?.[index]);
  const opacity = indexToScroll > index ? 0.7 : 1;

  React.useEffect(() => {
    let interaction;

    if (icon) {
      interaction = InteractionManager.runAfterInteractions(() => {
        itemRef.current?.play();
      });
    }

    return () => interaction?.cancel();
  }, [icon]);

  return (
    <View style={[styles.itemContainer, {opacity}]}>
      {/* Time */}
      <CText medium size={3}>
        {moment(time).format('h A')}
      </CText>

      {/* Weather animation */}
      {!!icon && (
        <LottieView
          ref={itemRef}
          style={styles.lottie}
          source={getWeatherIconFromCode(item, time)?.icon}
        />
      )}

      {/* Footer */}
      <CText bold>{`${temperature}°`}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 64,
    marginTop: wp(2),
    borderRadius: wp(6),
    alignItems: 'center',
    paddingVertical: wp(4),
    backgroundColor: colors.darkBg,
  },
  lottie: {
    marginTop: wp(2),
    width: 42,
    height: 42,
  },
});

export default React.memo(TodayForecastItem);
