import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
const Stack = createNativeStackNavigator();

export default function AccountPage() {
  return (
    // <NavigationContainer independent={true}>
    //   <StatusBar barStyle={'dark-content'} />
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       options={{headerShown: false}}
    //       name="Login"
    //       component={LoginScreen}
    //     />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
