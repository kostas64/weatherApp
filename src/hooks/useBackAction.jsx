import React from 'react';
import {BackHandler} from 'react-native';

import {isIOS} from '../assets/constants';

const useBackAction = custonBackAction => {
  React.useEffect(() => {
    const backAction = () => {
      if (isIOS) return;

      !!custonBackAction && custonBackAction();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default useBackAction;
