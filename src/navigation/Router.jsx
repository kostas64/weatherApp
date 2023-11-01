import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import SevenDays from '../screens/SevenDays';

const Stack = createNativeStackNavigator();

const Router = () => {
  const fade = {
    animation: 'fade',
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="SevenDays"
          component={SevenDays}
          options={{...fade}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Router;
