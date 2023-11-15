import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import {Context} from '../context/Context';
import SevenDays from '../screens/SevenDays';
import Background from '../components/Background';
import {getWeatherIconFromCode} from '../utils/Utils';

const Stack = createNativeStackNavigator();

const Router = () => {
  const fade = {
    animation: 'fade',
  };

  const screenOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  const {forecastData} = React.useContext(Context);
  const dataCode = forecastData?.current?.weathercode;
  const weatherData = getWeatherIconFromCode(dataCode);

  return (
    <>
      {/* Set app background globally */}
      <Background weatherCode={weatherData?.img} />

      <Stack.Navigator screenOptions={screenOptions}>
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
