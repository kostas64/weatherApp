import {PermissionsAndroid} from 'react-native';

export const requestPerms = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]);

  const isGranted =
    granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
    granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted';

  return isGranted;
};
