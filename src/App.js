import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';

import TabsNavigator from './navigation/TabNavigator';
import './components/ActionSheet/sheets.tsx';

const App = () => {
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
