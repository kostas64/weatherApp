import React from 'react';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Router from './src/navigation/Router';
import ContextProvider from './src/context/Context';
import {hideSplash, navTheme} from './src/utils/Utils';
import StatusBarManager from './src/components/StatusBarManager';

export const storage = new MMKVLoader().initialize();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={navTheme} onReady={hideSplash}>
        <StatusBarManager>
          <ContextProvider>
            <Router />
          </ContextProvider>
        </StatusBarManager>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
