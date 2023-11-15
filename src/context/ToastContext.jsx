import Animated, {
  withTiming,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from '../components/Text';
import {images} from '../assets/images';
import {WIDTH, isIOS} from '../assets/constants';

export const ToastContext = React.createContext({});

const ToastProvider = ({children}) => {
  const topPost = isIOS
    ? toast?.top + 24 - 100 || -100
    : toast?.top + 24 - 112 || -112;

  const topPosition = useSharedValue(topPost);
  const [toast, setToast] = React.useState({});

  const animStyle = useAnimatedStyle(() => ({
    top: topPosition.value,
  }));

  const animateToast = () => {
    const toastTop = isIOS ? -100 : -112;

    if (!!toast.city) {
      topPosition.value = withSpring(54, {
        mass: 3,
        damping: 30,
        stiffness: 125,
      });

      setTimeout(() => {
        topPosition.value = withTiming(toastTop, {
          duration: 500,
        });
      }, 3000);
    }
  };

  React.useEffect(() => {
    animateToast();
  }, [toast]);

  return (
    <ToastContext.Provider value={{setToast}}>
      {children}
      <Animated.View style={[animStyle, styles.container]}>
        <BlurView
          blurAmount={isIOS ? 8 : 24}
          overlayColor={'#00000000'}
          blurType={isIOS ? 'extraDark' : 'xlight'}
          reducedTransparencyFallbackColor="rgba(37,42,54,.25)"
          style={[
            styles.blurView,
            !isIOS && {backgroundColor: 'rgba(37,42,54,0.25)'},
          ]}>
          <Animated.View
            style={[
              styles.innerContainer,
              isIOS && {top: wp(4)},
              !isIOS && {backgroundColor: 'rgba(0,0,0,0.5)'},
            ]}>
            <View style={[styles.row, !isIOS && {top: wp(4)}]}>
              <Image source={images.tick} style={styles.image} />
              <CText numberOfLines={2} style={styles.cityName}>
                <CText bold>{toast.city}</CText>
                <CText>{` has been added to 'Your Places'. Check below!`}</CText>
              </CText>
            </View>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    position: 'absolute',
    borderRadius: 9,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    overflow: 'hidden',
    width: WIDTH - wp(12),
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  blurView: {
    width: '100%',
    height: isIOS ? 60 : 66,
  },
  innerContainer: {
    paddingRight: wp(3),
    borderRadius: 8,
    alignSelf: 'center',
    width: WIDTH - wp(12),
  },
  image: {
    width: wp(4),
    height: wp(4),
    tintColor: 'white',
    marginLeft: wp(4),
    marginRight: wp(2),
  },
  cityName: {
    width: WIDTH - wp(27),
    top: isIOS ? 0 : -2,
    height: 46,
  },
});

export default ToastProvider;
