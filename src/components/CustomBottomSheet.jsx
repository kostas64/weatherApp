/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useBottomSheetBackHandler} from '../hooks/useBottomSheetBackHandler';

const Background = () => <View />;

const CustomBottomSheet = React.forwardRef(
  ({modalContent, onCloseBottomSheet, snapPoints}, ref) => {
    const {handleSheetPositionChange} = useBottomSheetBackHandler(ref);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        onChange={handleSheetPositionChange}
        style={styles.container}
        onClose={onCloseBottomSheet}
        backgroundComponent={props => <Background {...props} />}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            enableTouchThrough={true}
            style={[styles.backgroundColor, StyleSheet.absoluteFillObject]}
          />
        )}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.indicatorStyle}
        enablePanDownToClose={true}>
        {modalContent}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 3,
    zIndex: 1,
  },
  backgroundColor: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  indicatorStyle: {
    backgroundColor: 'black',
  },
});

export default CustomBottomSheet;
