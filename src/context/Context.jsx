import React from 'react';

import {getForecast} from '../api';
import {getTemps} from '../utils/Utils';
import {yourPlaces as places} from '../assets/yourPlaces';

export const Context = React.createContext({});

const ContextProvider = ({children}) => {
  const [forecastData, setForecastData] = React.useState([]);
  const [yourPlaces, setYourPlaces] = React.useState(places);
  const [isCelsius, setIsCelsius] = React.useState(true);
  const [selected, setSelected] = React.useState(places?.[places?.length - 1]);
  const [loadingApi, setLoadingApi] = React.useState({
    api1: false,
    api2: false,
  });

  const tempUnit = isCelsius ? 'celsius' : 'fahrenheit';

  React.useEffect(() => {
    setLoadingApi({...loadingApi, api1: true});

    getForecast(selected, tempUnit)
      .then(data => {
        setForecastData(data);
      })
      .finally(() => setLoadingApi({...loadingApi, api1: false}));
  }, [selected, isCelsius]);

  React.useEffect(() => {
    setLoadingApi({...loadingApi, api2: true});

    getTemps(yourPlaces, setYourPlaces, tempUnit).finally(() =>
      setLoadingApi({...loadingApi, api2: false}),
    );
  }, [selected, isCelsius]);

  return (
    <Context.Provider
      value={{
        loadingApi: loadingApi.api1 || loadingApi.api2,
        yourPlaces,
        setYourPlaces,
        forecastData,
        setForecastData,
        selectedPlace: selected,
        setSelectedPlace: setSelected,
        isCelsius,
        setIsCelsius,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
