/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {MainContextProvider} from './util/MainContext';
import SplashScreen from 'react-native-splash-screen';
import {Home} from './screens/Home';
import {RootSiblingParent} from 'react-native-root-siblings';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <RootSiblingParent>
      <MainContextProvider>
        <Home />
      </MainContextProvider>
    </RootSiblingParent>
  );
};

export default App;
