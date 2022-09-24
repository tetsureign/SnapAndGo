/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import MapPage from './screens/MapPage';
import CameraPage from './screens/CameraPage';
import AccountPage from './screens/AccountPage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Camera"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'rgb(55, 174, 15)',
        tabBarStyle: {
          position: 'absolute',
          height: 75,
          elevation: 0,
          backgroundColor: 'rgba(38, 38, 38, 0.75)',
        },
      })}>
      <Tab.Screen
        name="Bản đồ"
        component={MapPage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('./assets/icons/map.png')}
              style={{width: 40, height: 40}}
              tintColor={color}
            />
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
          tabBarIcon: ({color}) => (
            <Image
              source={require('./assets/icons/user.png')}
              style={{width: 40, height: 40}}
              tintColor={color}
            />
          ),
          // tabBarColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
