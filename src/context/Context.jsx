import React, {useEffect, useState} from 'react';

import {getForecast} from '../api';
import {yourPlaces as mockPlaces} from '../assets/yourPlaces';

export const Context = React.createContext({});

const ContextProvider = ({children}) => {
  const [forecastData, setForecastData] = useState([]);
  const [yourPlaces, setYourPlaces] = useState(mockPlaces);

  useEffect(() => {
    getForecast()
      .then(data => {
        setForecastData(data);
      })
      .catch(e => console.log('Forecast error ', e));
  }, []);

  return (
    <Context.Provider
      value={{
        yourPlaces,
        setYourPlaces,
        forecastData,
        setForecastData,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
