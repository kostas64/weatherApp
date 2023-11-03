import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AnimatedFade from './AnimatedFade';
import TodayForecastItem from './TodayForecastItem';
import TodayForecastListHeader from './TodayForecastListHeader';

const TodayForecast = ({data}) => {
  const timeData = data?.time?.slice(0, 24);
  const weatherCodeData = data?.weathercode?.slice(0, 24);
  const temperatureData = data?.temperature_2m?.slice(0, 24);

  const Separator = () => <View style={{width: wp(4)}} />;

  const ListHeader = () => <TodayForecastListHeader />;

  const renderItem = ({item, index}) => (
    <TodayForecastItem
      index={index}
      item={item}
      timeData={timeData}
      temperatureData={temperatureData}
    />
  );

  return (
    <AnimatedFade>
      {/*List Header */}
      <ListHeader />

      {/*Today Forecast  */}
      {weatherCodeData?.length > 0 && (
        <FlashList
          horizontal
          data={weatherCodeData}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          estimatedItemSize={wp(17)}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </AnimatedFade>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(6),
  },
});

export default TodayForecast;
