import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Context} from '../context/Context';
import TomorrowListItem from './TomorrowListItem';

const TomorrowList = ({setModalContent}) => {
  const {forecastData: data} = React.useContext(Context);

  const dailyData = data?.daily;
  const listData = dailyData?.time?.slice(2, 7);

  const renderItem = (item, index) => (
    <TomorrowListItem
      key={index}
      index={index}
      item={item}
      setModalContent={setModalContent}
    />
  );

  return (
    <View style={styles.container}>
      {listData?.map((item, index) => renderItem(item, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(6),
    paddingHorizontal: wp(6),
    paddingBottom: hp(4),
  },
});

export default TomorrowList;
