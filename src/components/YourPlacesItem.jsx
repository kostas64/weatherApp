import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {colors} from '../assets/colors';
import RemoveButton from './RemoveButton';
import {Context} from '../context/Context';

const AnimText = Animated.createAnimatedComponent(Text);
const AnimLottie = Animated.createAnimatedComponent(LottieView);

const YourPlacesItem = ({
  item,
  closeButton,
  onDismissItem,
  longPressActivated,
  setLongPressActivated,
  index,
}) => {
  const itemRef = React.useRef();
  const itemOpacity = useSharedValue(1);
  const itemSeparator = useSharedValue(16);
  const cityWidth = useSharedValue(112);
  const lottieWidth = useSharedValue(64);
  const containerWidth = useSharedValue(278);
  const paddingLeft = useSharedValue(8);
  const paddingRight = useSharedValue(24);
  const spaceLeft = useSharedValue(12);
  const spaceRight = useSharedValue(24);

  const {selectedPlace, setSelectedPlace} = React.useContext(Context);

  const onItemPress = () => {
    if (selectedPlace.city !== item.city) {
      setSelectedPlace(item);
    }
  };

  const onPressRemove = () => {
    paddingLeft.value = 0;
    paddingRight.value = 0;
    spaceLeft.value = 0;
    spaceRight.value = 0;
    itemSeparator.value = 0;
    itemOpacity.value = withTiming(0, {duration: 200});
    containerWidth.value = withTiming(0, {duration: 250});
    lottieWidth.value = withTiming(0, {duration: 250});
    cityWidth.value = withTiming(0, {duration: 250}, isFinished => {
      if (isFinished) {
        onDismissItem(item);
      }
    });
  };

  const itemAnimStyle = useAnimatedStyle(() => ({
    opacity: itemOpacity.value,
    width: containerWidth.value,
    paddingLeft: paddingLeft.value,
    paddingRight: paddingRight.value,
  }));

  const lottieAnimStyle = useAnimatedStyle(() => ({
    width: lottieWidth.value,
  }));

  const cityAnimStyle = useAnimatedStyle(() => ({
    width: cityWidth.value,
  }));

  const spaceAnimStyle = useAnimatedStyle(() => ({
    marginLeft: spaceLeft.value,
    marginRight: spaceRight.value,
  }));

  const itemSepAnimStyle = useAnimatedStyle(() => ({
    width: itemSeparator.value,
  }));

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      itemOpacity.value = withTiming(0.25, {duration: 100});
    })
    .onStart(() => runOnJS(onItemPress)())
    .onFinalize(() => {
      itemOpacity.value = withTiming(1, {duration: 150});
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      runOnJS(setLongPressActivated)(true);
    })
    .onFinalize(() => {
      runOnJS(setLongPressActivated)(false);
    });

  React.useEffect(() => {
    itemRef.current?.play();
  });

  return (
    <>
      <RemoveButton
        onPress={onPressRemove}
        closeButton={closeButton}
        itemPressed={longPressActivated}
      />
      <GestureDetector gesture={Gesture.Race(tapGesture, longPressGesture)}>
        <View style={styles.row}>
          <Animated.View key={index} style={[styles.container, itemAnimStyle]}>
            {/* Weather animation */}
            <AnimLottie
              ref={itemRef}
              source={item.lottie}
              style={[styles.lottie, lottieAnimStyle]}
            />

            {/*  City & Desc & Temperature */}
            <Animated.View style={spaceAnimStyle}>
              <AnimText numberOfLines={1} style={[cityAnimStyle, styles.city]}>
                {item.city}
              </AnimText>
              <CText size={3}>{item.desc}</CText>
            </Animated.View>

            {/* Temperature */}
            <CText>
              <CText bold size={6}>
                {Math.floor(item.temperature)}
              </CText>
              <CText size={6}>°</CText>
            </CText>
          </Animated.View>
          <Animated.View style={itemSepAnimStyle} />
        </View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    marginTop: wp(3),
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.darkBg,
  },
  lottie: {
    top: 4,
    height: 72,
  },
  city: {
    color: 'white',
    fontSize: wp(4),
    fontFamily: 'Gilroy-Bold',
  },
});

export default YourPlacesItem;
