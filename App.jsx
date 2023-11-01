import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Router from './src/navigation/Router';
import ContextProvider from './src/context/Context';
import StatusBarManager from './src/components/StatusBarManager';

const App = () => {
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
