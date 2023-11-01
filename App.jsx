import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {getForecast} from './src/api';
import Router from './src/navigation/Router';
import ContextProvider from './src/context/Context';
import StatusBarManager from './src/components/StatusBarManager';

const App = () => {
  useEffect(() => {
    getForecast();
  }, []);

  return (
    <NavigationContainer>
      <StatusBarManager>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </StatusBarManager>
    </NavigationContainer>
  );
};

export default App;
