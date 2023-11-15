import React from 'react';
import {runOnJS} from 'react-native-reanimated';
import {StyleSheet, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Context} from '../context/Context';
import YourPlacesItem from './YourPlacesItem';
import YourPlacesListHeader from './YourPlacesListHeader';

const YourPlaces = ({
  onPressAdd,
  closeButton,
  longPressActivated,
  setLongPressActivated,
}) => {
  const {yourPlaces, setLoadingApi, setYourPlaces} = React.useContext(Context);

  const renderItem = React.useCallback(
    ({item, index}) => (
      <YourPlacesItem
        key={index}
        item={item}
        index={index}
        closeButton={closeButton}
        onDismissItem={onDismissItem}
        longPressActivated={longPressActivated}
        setLongPressActivated={setLongPressActivated}
      />
    ),
    [longPressActivated],
  );

  const onDismissItem = React.useCallback(item => {
    'worklet';
    runOnJS(setLoadingApi)({api1: true, api2: false});

    const filteredPlaces = yourPlaces.filter(place => place.city !== item.city);
    runOnJS(setYourPlaces)(filteredPlaces);

    runOnJS(setLoadingApi)({api1: false, api2: false});
  }, []);

  return (
    <>
      {/* List Header */}
      <YourPlacesListHeader onPressAdd={onPressAdd} />

      {/* Other Cities List */}
      <FlatList
        horizontal
        data={yourPlaces}
        scrollEnabled={true}
        style={{height: 116}}
        renderItem={renderItem}
        initialNumToRender={2}
        keyExtractor={(_, index) => `$${index}`}
        getItemLayout={(_, index) => ({
          length: 294,
          offset: index * 294,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(6),
    paddingBottom: wp(8),
  },
});

export default YourPlaces;
