import React from 'react';
import {View, Text, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraPage from './CameraPage';
import ImageDetectPage from './ImageDetectPage';

const Stack = createNativeStackNavigator();

const CameraStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Trang Camera"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Trang Camera" component={CameraPage} />
      <Stack.Screen name="Nhận diện" component={ImageDetectPage} />
    </Stack.Navigator>
  );
};

export default CameraStack;
