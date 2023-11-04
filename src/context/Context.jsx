import React, {useEffect, useState} from 'react';

import {getForecast} from '../api';
import {getTemps} from '../utils/Utils';
import {yourPlaces as mockPlaces} from '../assets/yourPlaces';

export const Context = React.createContext({});

const ContextProvider = ({children}) => {
  const [loadingApi, setLoadingApi] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [yourPlaces, setYourPlaces] = useState(mockPlaces);
  const [selectedPlace, setSelectedPlace] = useState(
    mockPlaces?.[mockPlaces?.length - 1],
  );

  useEffect(() => {
    !loadingApi && setLoadingApi(true);

    getForecast(selectedPlace)
      .then(data => {
        setForecastData(data);
      })
      .finally(() => setLoadingApi(false));
  }, [selectedPlace]);

  useEffect(() => {
    getTemps(mockPlaces, setYourPlaces);
  }, []);

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
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
