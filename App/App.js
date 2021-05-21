/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {MainContextProvider} from './util/MainContext';
import SplashScreen from 'react-native-splash-screen';
import {Home} from './screens/Home';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <MainContextProvider>
      <Home />
    </MainContextProvider>
  );
};

export default App;
