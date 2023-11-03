import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AnimatedFade from './AnimatedFade';
import OtherCitiesItem from './OtherCitiesItem';
import {otherCities} from '../assets/otherCities';
import OtherCitiesListHeader from './OtherCitiesListHeader';

const OtherCities = ({animated}) => {
  const Separator = () => <View style={styles.separator} />;

  const renderItem = ({item, index}) => (
    <OtherCitiesItem item={item} index={index} />
  );

  const Wrapper = animated ? AnimatedFade : View;

  return (
    <Wrapper>
      {/* List Header */}
      <OtherCitiesListHeader />

      {/* Other Cities List */}
      <FlatList
        data={otherCities}
        horizontal
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(6),
    paddingBottom: wp(8),
  },
  separator: {
    width: wp(4),
  },
});

export default OtherCities;
