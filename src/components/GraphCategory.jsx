import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors} from '../assets/colors';
import GraphCategoryItem from './GraphCategoryItem';
import GraphCategoryButton from './GraphCategoryButton';
import {graphCategories} from '../assets/graphCategories';

const GraphCategory = ({selected, setSelected}) => {
  const listHeight = useSharedValue(0);

  const renderItem = ({item, index}) => {
    const onItemSelect = item => {
      setSelected(item);
      animateList();
    };

    return (
      <GraphCategoryItem
        key={index}
        label={item.label}
        img={item.img}
        isChecked={item.label === selected}
        isLast={index === graphCategories.length - 1}
        setSelected={onItemSelect}
      />
    );
  };

  const animateList = () => {
    const toValue = listHeight.value === 171 ? 0 : 171;
    listHeight.value = withTiming(toValue, {
      duration: 350,
    });
  };

  const listAnimStyle = useAnimatedStyle(() => ({
    height: listHeight.value,
  }));

  return (
    <>
      <GraphCategoryButton selected={selected} animateList={animateList} />
      <Animated.FlatList
        data={graphCategories}
        bounces={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={[styles.listContainer, listAnimStyle]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: wp(2),
    borderRadius: wp(4),
    alignSelf: 'flex-start',
    backgroundColor: colors.fallback,
  },
});

export default GraphCategory;
