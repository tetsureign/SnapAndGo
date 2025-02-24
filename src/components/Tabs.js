import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Map, Search, List} from 'iconoir-react-native';

import MapPage from '../screens/MapPage';
import CameraStack from '../screens/Camera/CameraPagesNavigator';
import HistoryPage from '../screens/HistoryPage';

const Tab = createBottomTabNavigator();

const RenderTabsLabel = (focused, color, text) => {
  return focused && <Text style={{color: color}}>{text}</Text>;
};

const Tabs = () => {
  const insets = useSafeAreaInsets();

  // TODO: global style this
  const colors = {
    gray: '#AAAAAA',
    green: '#37AE0F',
    blue: '#00C5FF',
    orange: '#FF6901',
  };

  const TabScreens = [
    {
      name: 'map-screen',
      component: MapPage,
      options: {
        title: 'Bản đồ',
        headerTransparent: true,
        headerBackground: () => <View style={styles.lightHeader} />,
        tabBarStyle: [styles.lightTabBar, {height: 75 + insets.bottom}],
        tabBarActiveTintColor: colors.green,
        tabBarIcon: ({focused, color, size}) => (
          <Map color={color} height={size * 1.5} width={size * 1.5} />
        ),
        tabBarLabel: ({focused, color}) => {
          return RenderTabsLabel(focused, color, 'Bản đồ');
        },
      },
    },
    {
      name: 'camera-screen',
      component: CameraStack,
      options: {
        title: 'Tìm kiếm',
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarIcon: ({focused, color, size}) => (
          <Search color={color} width={size * 1.5} height={size * 1.5} />
        ),
        tabBarLabel: ({focused, color}) => {
          return RenderTabsLabel(focused, color, 'Tìm kiếm');
        },
      },
    },
    {
      name: 'history-page',
      component: HistoryPage,
      options: {
        title: 'Lịch sử',
        tabBarStyle: [styles.lightTabBar, {height: 75 + insets.bottom}],
        tabBarActiveTintColor: colors.orange,
        tabBarIcon: ({focused, color, size}) => (
          <List color={color} width={size * 1.5} height={size * 1.5} />
        ),
        tabBarLabel: ({focused, color}) => {
          return RenderTabsLabel(focused, color, 'Lịch sử');
        },
      },
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="camera-screen"
      shifting={true}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: 'rgb(170, 170, 170)',
        tabBarStyle: [styles.darkTabBar, {height: 75 + insets.bottom}],
      })}>
      {TabScreens.map((element, index) => {
        return (
          <Tab.Screen
            name={element.name}
            component={element.component}
            options={element.options}
            key={index}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  // Header
  lightHeader: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  darkHeader: {
    flex: 1,
    backgroundColor: 'rgba(38, 38, 38, 0.75)',
  },

  // Tab bar
  lightTabBar: {
    position: 'absolute',
    // height: 75,
    elevation: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  darkTabBar: {
    position: 'absolute',
    // height: 75,
    elevation: 0,
    backgroundColor: 'rgba(38, 38, 38, 0.75)',
  },

  // Icon
  iconSize: {
    width: 40,
    height: 40,
  },
});

export default Tabs;
