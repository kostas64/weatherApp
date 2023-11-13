import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {View, StyleSheet, InteractionManager} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Context} from '../context/Context';
import TodayForecastItem from './TodayForecastItem';
import {findFirstFutureIndex} from '../utils/Utils';
import TodayForecastListHeader from './TodayForecastListHeader';

const TodayForecast = ({data, onPress, onPressBack}) => {
  const listRef = React.useRef();
  const {selectedPlace} = React.useContext(Context);

  const timeData = data?.time?.slice(0, 24);
  const weatherCodeData = data?.weathercode?.slice(0, 24);
  const temperatureData = data?.temperature_2m?.slice(0, 24);
  const indexToScroll = findFirstFutureIndex(timeData) - 1;

  const Separator = React.useCallback(
    () => <View style={{width: wp(4)}} />,
    [],
  );

  const ListHeader = React.useCallback(
    () => (
      <TodayForecastListHeader onPress={onPress} onPressBack={onPressBack} />
    ),
    [onPress, onPressBack],
  );

  const renderItem = ({item, index}) => (
    <TodayForecastItem
      index={index}
      item={item}
      timeData={timeData}
      indexToScroll={indexToScroll}
      temperatureData={temperatureData}
    />
  );

  React.useEffect(() => {
    if (indexToScroll > 0 && weatherCodeData?.length > 0) {
      InteractionManager.runAfterInteractions(() => {
        //750 because 250delay + 500duration of FadeInDown anim
        setTimeout(() => {
          listRef?.current?.scrollToOffset({
            offset: indexToScroll * 80,
            animated: true,
          });
        }, 750);
      });
    }
  }, [timeData, weatherCodeData, selectedPlace]);

  return (
    <>
      {/*List Header */}
      <ListHeader />

      {/*Today Forecast  */}
      {weatherCodeData?.length > 0 && (
        <FlashList
          ref={listRef}
          horizontal
          data={weatherCodeData}
          estimatedItemSize={80}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(6),
  },
});

export default TodayForecast;
