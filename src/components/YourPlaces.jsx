import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AnimatedFade from './AnimatedFade';
import {Context} from '../context/Context';
import YourPlacesItem from './YourPlacesItem';
import YourPlacesListHeader from './YourPlacesListHeader';

const YourPlaces = ({animated, onPressAdd}) => {
  const {yourPlaces} = React.useContext(Context);

  const Separator = () => <View style={styles.separator} />;

  const renderItem = ({item, index}) => (
    <YourPlacesItem item={item} index={index} />
  );

  const Wrapper = animated ? AnimatedFade : View;

  return (
    <Wrapper>
      {/* List Header */}
      <YourPlacesListHeader onPressAdd={onPressAdd} />

      {/* Other Cities List */}
      <FlatList
        horizontal
        data={yourPlaces}
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

export default YourPlaces;
