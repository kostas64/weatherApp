import React from 'react';
import {Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const CText = ({
  medium,
  bold,
  semiBold,
  color = 'white',
  size = 4,
  style,
  children,
}) => {
  const getFontFamily = () => {
    if (medium) {
      return 'Gilroy-Medium';
    } else if (semiBold) {
      return 'Gilroy-SemiBold';
    } else if (bold) {
      return 'Gilroy-Bold';
    } else {
      return 'Gilroy-Regular';
    }
  };

  return (
    <Text
      style={[
        {
          color,
          fontSize: wp(size),
          fontFamily: getFontFamily(),
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default CText;
