import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CameraPage from '@/screens/Camera/CameraPage';
import ImageDetectPage from '@/screens/Camera/ImageDetectPage';

import {CameraStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<CameraStackParamList>();

const CameraStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="main-camera"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerTintColor: 'white',
        headerStyle: styles.darkHeader,
      }}>
      <Stack.Screen
        name="main-camera"
        options={{title: 'Snap&Go'}}
        component={CameraPage}
      />
      <Stack.Screen
        name="detect-page"
        options={{title: 'Nhận diện'}}
        component={ImageDetectPage}
      />
      {/* <Stack.Screen name="Thông tin" component={InfoPage} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  darkHeader: {
    flex: 1,
    backgroundColor: 'rgba(38, 38, 38, 0.75)',
  },
});

export default CameraStack;
