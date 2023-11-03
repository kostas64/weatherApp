import {Platform} from 'react-native';
import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const isIOS = Platform.OS === 'ios';
