import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const CustomBottomSheet = React.forwardRef(
  ({modalContent, onCloseBottomSheet, snapPoints}, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        style={styles.container}
        onClose={onCloseBottomSheet}
        backgroundComponent={() => <View />}
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
    borderRadius: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 7,
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
