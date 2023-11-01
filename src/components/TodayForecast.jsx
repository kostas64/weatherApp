import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
    <View>
      {/*List Header */}
      <ListHeader />

      {/*Today Forecast  */}
      <FlatList
        horizontal
        contentContainerStyle={styles.listContainer}
        data={weatherCodeData}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(6),
  },
});

export default TodayForecast;
