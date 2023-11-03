import {StyleSheet, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {colors} from '../assets/colors';

const Background = ({weatherCode}) => {
  const [image, setImage] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const hasWeatherCode = typeof weatherCode === 'number';

  const changeWeatherCondition = newCondition => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true, // Required for image transitions
    }).start(() => {
      setImage(newCondition);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true, // Required for image transitions
      }).start();
    });
  };

  useEffect(() => {
    if (hasWeatherCode) {
      console.log('Count me!!');
      changeWeatherCondition(weatherCode);
    }
  }, [weatherCode]);

  return (
    <>
      {/* Fallback background */}
      <View style={[StyleSheet.absoluteFill, styles.fallbackBg]} />

      {/* Animated image based on weather */}
      {hasWeatherCode && (
        <Animated.Image
          source={image}
          blurRadius={12}
          style={[styles.img, {opacity}]}
        />
      )}

      {/* Backdrop */}
      <View style={styles.backdrop} />
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    backgroundColor: colors.lightBg,
    width: '100%',
    height: '100%',
  },
  img: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
  },
  fallbackBg: {
    backgroundColor: colors.fallback,
  },
});

export default Background;
