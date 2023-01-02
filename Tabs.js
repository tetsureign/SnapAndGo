/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapPage from './screens/MapPage';
import CameraStack from './screens/Camera/CameraPagesNavigator';
import AccountPage from './screens/AccountPage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const insets = useSafeAreaInsets();
  console.log(insets.bottom);
  return (
    <Tab.Navigator
      initialRouteName="Camera"
      shifting={true}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: 'rgb(170, 170, 170)',
        tabBarShowLabel: false,
        tabBarStyle: [styles.darkTabBar, {height: 75 + insets.bottom}],
      })}>
      <Tab.Screen
        name="Bản đồ"
        component={MapPage}
        options={{
          headerTransparent: true,
          headerBackground: () => <View style={styles.lightHeader} />,
          tabBarStyle: [styles.lightTabBar, {height: 75 + insets.bottom}],
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('./assets/icons/map.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? '#37AE0F' : '#AAAAAA',
                }}
              />
              {focused && (
                <Text
                  style={{
                    color: focused ? '#37AE0F' : '#AAAAAA',
                  }}>
                  Bản đồ
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('./assets/icons/search.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? '#00C5FF' : '#AAAAAA',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={AccountPage}
        options={{
          tabBarStyle: [styles.lightTabBar, {height: 75 + insets.bottom}],
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('./assets/icons/user.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? '#FF6901' : '#AAAAAA',
                }}
              />
              {focused && (
                <Text style={{color: focused ? '#FF6901' : '#AAAAAA'}}>
                  Tài khoản
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  lightHeader: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  lightTabBar: {
    position: 'absolute',
    // height: 75,
    elevation: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  darkHeader: {
    flex: 1,
    backgroundColor: 'rgba(38, 38, 38, 0.75)',
  },
  darkTabBar: {
    position: 'absolute',
    // height: 75,
    elevation: 0,
    backgroundColor: 'rgba(38, 38, 38, 0.75)',
  },
});

export default Tabs;
