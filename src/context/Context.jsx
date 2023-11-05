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

  const tempUnit = isCelsius ? 'celsius' : 'fahrenheit';

  React.useEffect(() => {
    !loadingApi && setLoadingApi(true);

    getForecast(selectedPlace, tempUnit)
      .then(data => {
        setForecastData(data);
      })
      .finally(() => setLoadingApi(false));
  }, [selectedPlace, isCelsius]);

  React.useEffect(() => {
    getTemps(mockPlaces, setYourPlaces, tempUnit);
  }, [mockPlaces, isCelsius]);

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
