import React from 'react';
import {runOnJS} from 'react-native-reanimated';
import {StyleSheet, View, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AnimatedFade from './AnimatedFade';
import {Context} from '../context/Context';
import YourPlacesItem from './YourPlacesItem';
import YourPlacesListHeader from './YourPlacesListHeader';

const YourPlaces = ({
  animated,
  onPressAdd,
  closeButton,
  longPressActivated,
  setLongPressActivated,
}) => {
  const {yourPlaces, setLoadingApi, setYourPlaces} = React.useContext(Context);

  const renderItem = ({item, index}) => (
    <YourPlacesItem
      key={index}
      item={item}
      index={index}
      closeButton={closeButton}
      onDismissItem={onDismissItem}
      longPressActivated={longPressActivated}
      setLongPressActivated={setLongPressActivated}
    />
  );

  const onDismissItem = item => {
    'worklet';
    runOnJS(setLoadingApi)({api1: true, api2: false});

    const filteredPlaces = yourPlaces.filter(place => place.city !== item.city);
    runOnJS(setYourPlaces)(filteredPlaces);

    runOnJS(setLoadingApi)({api1: false, api2: false});
  };

  const Wrapper = animated ? AnimatedFade : View;

  return (
    <Wrapper>
      {/* List Header */}
      <YourPlacesListHeader onPressAdd={onPressAdd} />

      {/* Other Cities List */}
      <FlatList
        horizontal
        data={yourPlaces}
        scrollEnabled={true}
        style={{height: 116}}
        renderItem={renderItem}
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
});

export default YourPlaces;
