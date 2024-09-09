import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraPage from './CameraPage';
import ImageDetectPage from './ImgDetect/ImageDetectPage';
import InfoPage from '../InfoPage';

const Stack = createNativeStackNavigator();

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
        options={{title: 'Nhận diện'}}
        name="detect-page"
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
