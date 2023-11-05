import {
  View,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {colors} from '../assets/colors';
import {Context} from '../context/Context';

const YourPlacesItem = ({item, index}) => {
  const itemRef = React.useRef();
  const {setSelectedPlace} = React.useContext(Context);

  const onItemPress = () => {
    setSelectedPlace(item);
  };

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      itemRef.current?.play();
    });

    return () => interaction.cancel();
  }, []);

  return (
    <TouchableOpacity
      key={index}
      onPress={onItemPress}
      style={styles.container}>
      {/* Weather animation */}
      <LottieView ref={itemRef} source={item.lottie} style={styles.lottie} />

      {/*  City & Desc & Temperature */}
      <View style={styles.spaceHorizontal}>
        <CText bold numberOfLines={1} style={styles.city}>
          {item.city}
        </CText>
        <CText size={3}>{item.desc}</CText>
      </View>
      <CText>
        <CText bold size={6}>
          {Math.floor(item.temperature)}
        </CText>
        <CText size={6}>°</CText>
      </CText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: wp(3),
    paddingLeft: wp(2),
    paddingRight: wp(6),
    borderRadius: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.darkBg,
  },
  spaceHorizontal: {
    marginLeft: wp(3),
    marginRight: wp(6),
  },
  lottie: {
    top: wp(1),
    width: wp(16),
    height: wp(18),
  },
  city: {
    width: wp(28),
  },
});

export default YourPlacesItem;
