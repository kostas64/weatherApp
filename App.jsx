import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {navTheme} from './src/utils/Utils';
import Router from './src/navigation/Router';
import ContextProvider from './src/context/Context';
import StatusBarManager from './src/components/StatusBarManager';

const App = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBarManager>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </StatusBarManager>
    </NavigationContainer>
  );
};

export default App;
