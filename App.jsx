import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Router from './src/navigation/Router';
import StatusBarManager from './src/components/StatusBarManager';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBarManager>
        <Router />
      </StatusBarManager>
    </NavigationContainer>
  );
};

export default App;
