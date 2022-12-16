import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
