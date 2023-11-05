import React from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import CText from './Text';
import {query} from '../utils/Utils';
import {lottie} from '../assets/lottie';
import {Context} from '../context/Context';
import ClearInputButton from './ClearInputButton';

const SearchInput = ({value, setValue, onBlur, addPressed}) => {
  const ref = React.useRef();
  const {setSelectedPlace, setYourPlaces} = React.useContext(Context);

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

  const renderRightButton = React.useCallback(
    () => (
      <ClearInputButton
        onPress={() => {
          if (value?.length > 0) {
            setValue('');
            ref?.current?.setAddressText('');
          }
        }}
      />
    ),
    [],
  );

  const renderRow = React.useCallback(data => {
    return (
      <View style={styles.rowContainer}>
        <CText>{data?.description}</CText>
      </View>
    );
  }, []);

  const onItemPress = (_, details = null) => {
    if (addPressed) {
      setYourPlaces(old => [
        {
          city: details?.name,
          latitude: details?.geometry?.location?.lat,
          longitude: details?.geometry?.location?.lng,
          lottie: lottie.dayCloud, //We add mock data
          temperature: 10, //So to create the field
          desc: 'Mostly Sunny', //Will be calculated from api
        },
        ...old,
      ]);
    }

    setSelectedPlace({
      city: details?.name,
      latitude: details?.geometry?.location?.lat,
      longitude: details?.geometry?.location?.lng,
    });
  };

  return (
    <View style={[styles.container, {height: value?.length === 0 ? 50 : 300}]}>
      <GooglePlacesAutocomplete
        ref={ref}
        styles={autocompleteStyles}
        placeholder="Search for a city"
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
});

export default SearchInput;