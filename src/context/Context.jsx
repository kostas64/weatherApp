import React from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import Geolocation from '@react-native-community/geolocation';

import {storage} from '../../App';
import {getTemps} from '../utils/Utils';
import {lottie} from '../assets/lottie';
import {isIOS} from '../assets/constants';
import {getCityFromCoords, getForecast} from '../api';
import {requestPerms} from '../utils/PermissionUtils';
import {yourPlaces as places} from '../assets/yourPlaces';

export const Context = React.createContext({});

const ContextProvider = ({children}) => {
  const [forecastData, setForecastData] = useMMKVStorage(
    'forecast',
    storage,
    [],
  );

  const [yourPlaces, setYourPlaces] = useMMKVStorage(
    'yourPlaces',
    storage,
    places,
  );

  const firstOpen = React.useRef(0);
  const [isCelsius, setIsCelsius] = useMMKVStorage('isCelsius', storage, true);
  const [selected, setSelected] = React.useState(yourPlaces?.[0]);
  const [loadingApi, setLoadingApi] = React.useState({
    api1: true,
    api2: true,
    loc: true,
  });

  const tempUnit = isCelsius ? 'celsius' : 'fahrenheit';

  const forecastApi = (place, cityName) => {
    console.log('Calling Forecast API...', place, cityName);

    !loadingApi.api1 && setLoadingApi({...loadingApi, api1: true});
    getForecast(place || selected, tempUnit)
      .then(data => {
        setForecastData(data);
        if (!!place && !!cityName) {
          setSelected({
            city: cityName,
            latitude: place.latitude,
            longitude: place.longitude,
            desc: 'Mostly Sunny',
            temperature: 10,
            lottie: lottie.dayCloud,
          });
        }
      })
      .catch(e => console.log('Error on Forecase API ', e))
      .finally(async () => {
        setLoadingApi(oldLoadingApi => ({...oldLoadingApi, api1: false}));
      });
  };

  const placesApi = cb => {
    console.log('Calling Places Forecast API...');

    !loadingApi.api2 &&
      setLoadingApi(oldLoadingApi => ({...oldLoadingApi, api2: true}));

    getTemps(yourPlaces, setYourPlaces, tempUnit, cb)
      .catch(e => console.log('Error on Places Forecast API ', e))
      .finally(async () => {
        setLoadingApi(oldLoadingApi => ({...oldLoadingApi, api2: false}));
      });
  };

  const getCurrentPos = () => {
    Geolocation.getCurrentPosition(
      async info => {
        setLoadingApi(oldLoadingApi => ({...oldLoadingApi, loc: false}));

        const coords = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };

        const city = await getCityFromCoords(coords);
        placesApi(() => forecastApi(coords, city));
      },
      e => {
        console.log('Error on Geolocation.getCurrentPosition', e);
        setLoadingApi(oldLoadingApi => ({...oldLoadingApi, loc: false}));
        placesApi(() => forecastApi());
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  const handlePermissionsAndLocate = async () => {
    if (isIOS) {
      getCurrentPos();
    } else {
      try {
        const isGranted = await requestPerms();

        if (isGranted) {
          getCurrentPos();
        } else {
          setLoadingApi(oldLoadingApi => ({...oldLoadingApi, loc: false}));
          placesApi(() => forecastApi());
        }
      } catch (err) {
        setLoadingApi(oldLoadingApi => ({...oldLoadingApi, loc: false}));
        placesApi(() => forecastApi());
        console.warn(err);
      }
    }
  };

  React.useEffect(() => {
    if (firstOpen.current !== 0 && !loadingApi.loc) {
      forecastApi();
      placesApi();
    }

    firstOpen.current += 1;
  }, [selected, isCelsius]);

  React.useEffect(() => {
    handlePermissionsAndLocate();
  }, []);

  return (
    <Context.Provider
      value={{
        loadingApi: loadingApi.api1 || loadingApi.api2 || loadingApi.loc,
        setLoadingApi,
        yourPlaces,
        setYourPlaces,
        forecastData,
        setForecastData,
        selectedPlace: selected,
        setSelectedPlace: setSelected,
        isCelsius,
        setIsCelsius,
        forecastApi,
        placesApi,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
