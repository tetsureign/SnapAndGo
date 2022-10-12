/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'react-native';
import MapPage from './screens/MapPage';
import CameraPage from './screens/CameraPage';
import AccountPage from './screens/AccountPage';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Camera"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarInactiveTintColor: 'rgb(170, 170, 170)',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 75,
          elevation: 0,
          backgroundColor: 'rgba(38, 38, 38, 0.75)',
        },
        // tabBarBackground: () => (
        //   <BlurView
        //     style={{position: 'absolute'}}
        //     blurType="dark"
        //     blurAmount={100}
        //   />
        // ),
      })}>
      <Tab.Screen
        name="Bản đồ"
        component={MapPage}
        options={{
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
              <Text
                style={{
                  color: focused ? '#37AE0F' : '#AAAAAA',
                }}>
                Bản đồ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraPage}
        // options={{tabBarColor: '#262626'}}
      />
      <Tab.Screen
        name="Tài khoản"
        component={AccountPage}
        options={{
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
              <Text style={{color: focused ? '#FF6901' : '#AAAAAA'}}>
                Tài khoản
              </Text>
            </View>
          ),
          // tabBarColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
