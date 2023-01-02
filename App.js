import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Tabs from './Tabs';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
