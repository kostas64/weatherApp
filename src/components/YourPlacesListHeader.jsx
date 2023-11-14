import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import {images} from '../assets/images';
import {Context} from '../context/Context';

const YourPlacesListHeader = ({onPressAdd}) => {
  const {yourPlaces} = React.useContext(Context);

  return (
    <View style={styles.container}>
      <CText>Your Places</CText>
      {yourPlaces?.length < 10 ? (
        <TouchableOpacity onPress={onPressAdd} hitSlop={styles.hitSlop}>
          <Image source={images.cross} style={styles.img} />
        </TouchableOpacity>
      ) : (
        <CText>Max 10 places</CText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    justifyContent: 'space-between',
  },
  hitSlop: {
    top: wp(3),
    right: wp(3),
    left: wp(3),
    bottom: wp(3),
  },
  img: {
    width: wp(3),
    height: wp(3),
    tintColor: 'white',
    transform: [{rotate: '45deg'}],
  },
});

export default YourPlacesListHeader;
