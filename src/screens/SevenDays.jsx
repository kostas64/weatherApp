import React from 'react';
import {View, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {images} from '../assets/images';
import {colors} from '../assets/colors';
import Header from '../components/Header';
import {isIOS} from '../assets/constants';
import TomorrowBox from '../components/TomorrowBox';
import TomorrowList from '../components/TomorrowList';
import CustomBottomSheet from '../components/CustomBottomSheet';

const SevenDays = ({navigation, route}) => {
  const bottomSheetRef = React.useRef(null);
  const [modalContent, setModalContent] = React.useState(null);

  const {onPressBack} = route?.params || {};

  const leftIconStyle = {
    width: wp(10),
    height: wp(10),
    transform: [
      {
        rotate: '180deg',
      },
    ],
  };

  const onPressLeftIcon = () => {
    !!onPressBack && onPressBack();
    navigation.pop();
  };

  const onCloseBottomSheet = React.useCallback(() => {
    setModalContent(null);
    !!bottomSheetRef?.current && bottomSheetRef?.current?.close();
  }, []);

  React.useEffect(() => {
    if (isIOS) return;

    const backAction = () => {
      onPressBack();
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  if (modalContent) {
    bottomSheetRef.current.expand();
  }

  return (
    <>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          label={'6 Days'}
          leftIcon={images.arrow}
          leftIconStyle={leftIconStyle}
          onPressLeft={onPressLeftIcon}
        />

        {/* Tomorrow Box */}
        <View style={styles.tomorrowContainer}>
          <TomorrowBox setModalContent={setModalContent} />
        </View>

        {/* 5 days forecast */}
        <TomorrowList setModalContent={setModalContent} />
      </ScrollView>
      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={[386]}
        modalContent={modalContent}
        onCloseBottomSheet={onCloseBottomSheet}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    backgroundColor: colors.lightBg,
    width: '100%',
    height: '100%',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tomorrowContainer: {
    paddingTop: wp(6),
  },
});

export default SevenDays;
