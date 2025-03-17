import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import * as NavigationBar from 'expo-navigation-bar';

import TabsNavigator from './navigation/TabNavigator';
import './components/ActionSheet/sheets.tsx';

const App = () => {
  useEffect(() => {
    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync('transparent');
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SheetProvider>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <TabsNavigator />
        </SheetProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
