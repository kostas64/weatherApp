import React from 'react';

import {getForecast} from '../api';
import {getTemps} from '../utils/Utils';
import {yourPlaces as mockPlaces} from '../assets/yourPlaces';

export const Context = React.createContext({});

const ContextProvider = ({children}) => {
  const [isCelsius, setIsCelsius] = React.useState(true);
  const [loadingApi, setLoadingApi] = React.useState(false);
  const [forecastData, setForecastData] = React.useState([]);
  const [yourPlaces, setYourPlaces] = React.useState(mockPlaces);
  const [selectedPlace, setSelectedPlace] = React.useState(
    mockPlaces?.[mockPlaces?.length - 1],
  );

  React.useEffect(() => {
    !loadingApi && setLoadingApi(true);

    getForecast(selectedPlace)
      .then(data => {
        setForecastData(data);
      })
      .finally(() => setLoadingApi(false));
  }, [selectedPlace]);

  React.useEffect(() => {
    getTemps(mockPlaces, setYourPlaces);
  }, [mockPlaces]);

  return (
    <Context.Provider
      value={{
        loadingApi,
        yourPlaces,
        setYourPlaces,
        forecastData,
        setForecastData,
        selectedPlace,
        setSelectedPlace,
        isCelsius,
        setIsCelsius,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
