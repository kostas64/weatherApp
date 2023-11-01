import React, {useEffect, useState} from 'react';

import {getForecast} from '../api';

export const Context = React.createContext({});

const ContextProvider = ({children}) => {
  const [forecastData, setForecastData] = useState([]);

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
        forecastData,
        setForecastData,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
