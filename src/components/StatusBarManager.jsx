import {View, Text, StatusBar} from 'react-native';
import React from 'react';

const StatusBarManager = ({children}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      {children}
    </>
  );
};

export default StatusBarManager;
