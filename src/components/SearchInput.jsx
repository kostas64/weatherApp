import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import CText from './Text';
import {query} from '../utils/Utils';
import {lottie} from '../assets/lottie';
import {Context} from '../context/Context';
import {WIDTH, isIOS} from '../assets/constants';
import ClearInputButton from './ClearInputButton';
import useBackAction from '../hooks/useBackAction';
import {ToastContext} from '../context/ToastContext';

const SearchInput = ({
  value,
  label,
  searchPressed,
  setValue,
  onBlur,
  addPressed,
}) => {
  const ref = React.useRef();
  const insets = useSafeAreaInsets();
  const {setToast} = React.useContext(ToastContext);
  const {setSelectedPlace, yourPlaces, setYourPlaces} =
    React.useContext(Context);

  const placeholder = addPressed ? 'Add to "Your Places"' : 'Search for a city';

  const autocompleteStyles = {
    row: {
      backgroundColor: 'transparent',
    },
    listView: {
      left: -wp(2),
    },
    textInputContainer: styles.textInputContainer,
    textInput: styles.textInput,
  };

  const textInputProps = {
    onBlur,
    autoFocus: true,
    backgroundColor: 'transparent',
    placeholderTextColor: 'white',
    onChangeText: setValue,
    clearButtonMode: 'never',
  };

  const renderRightButton = () => (
    <ClearInputButton
      onPress={() => {
        if (value?.length > 0) {
          setValue('');
          ref?.current?.setAddressText('');
        }
      }}
    />
  );

  const renderRow = React.useCallback(data => {
    return (
      <View style={styles.rowContainer}>
        <CText>{data?.description}</CText>
      </View>
    );
  }, []);

  const onItemPress = (_, details = null) => {
    const placeIndex = yourPlaces?.findIndex(
      item => item.city === details?.name,
    );

    if (addPressed) {
      if (placeIndex === -1) {
        const newPlace = {
          city: details?.name,
          latitude: details?.geometry?.location?.lat,
          longitude: details?.geometry?.location?.lng,
          lottie: lottie.dayCloud, //We add mock data
          temperature: 10, //So to create the field
          desc: 'Mostly Sunny', //Will be calculated from api
        };

        setYourPlaces(old => [newPlace, ...old]);
        setSelectedPlace(newPlace);

        setTimeout(() => {
          setToast({city: details?.name, top: insets.top});
        }, 1500);
      } else {
        setSelectedPlace(yourPlaces?.[placeIndex]);
      }
    } else if (placeIndex !== -1) {
      setSelectedPlace(yourPlaces?.[placeIndex]);
    } else {
      setSelectedPlace({
        city: details?.name,
        latitude: details?.geometry?.location?.lat,
        longitude: details?.geometry?.location?.lng,
      });
    }

    !!onBlur && onBlur();
  };

  //Blur screen to go back when Android hardBack pressed
  useBackAction(onBlur);

  //Show city name if you
  //are not in search screen
  if (!searchPressed) {
    return (
      <CText
        numberOfLines={1}
        style={[styles.label, isIOS && styles.lineHeight]}>
        {label}
      </CText>
    );
  }

  return (
    <View
      style={[
        styles.container,
        value?.length === 0 ? styles.height50 : styles.height300,
      ]}>
      <GooglePlacesAutocomplete
        ref={ref}
        styles={autocompleteStyles}
        placeholder={placeholder}
        textInputProps={textInputProps}
        renderRightButton={renderRightButton}
        renderRow={renderRow}
        listViewDisplayed={'auto'}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={onItemPress}
        query={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp(2),
    width: wp(74),
  },
  textInputContainer: {
    top: wp(2),
    backgroundColor: 'transparent',
  },
  textInput: {
    color: 'white',
    fontSize: wp(5),
    fontFamily: 'Gilroy-Regular',
  },
  rowContainer: {
    marginVertical: wp(1),
  },
  lineHeight: {
    lineHeight: 56,
  },
  label: {
    color: 'white',
    fontSize: wp(4.5),
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
    textAlignVertical: 'center',
    width: WIDTH - 146,
  },
  height50: {
    height: 50,
  },
  height300: {
    height: 300,
  },
});

export default SearchInput;
