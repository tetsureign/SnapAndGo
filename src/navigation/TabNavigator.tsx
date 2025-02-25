import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Map, Search, List} from 'iconoir-react-native';

import tabNavigatorStyles from './TabNavigator.styles';

import MapPage from '../screens/MapPage';
import CameraStack from './CameraNavigator';
import HistoryPage from '../screens/HistoryPage';

const Tab = createBottomTabNavigator();

interface TabScreenOptions {
  name: string;
  component: React.ComponentType;
  options: BottomTabNavigationOptions;
}

const RenderTabsLabel = (focused: boolean, color: string, text: string) => {
  return focused && <Text style={{color: color}}>{text}</Text>;
};

const TabsNavigator = () => {
  const insets = useSafeAreaInsets();

  // TODO: global style this
  const colors = {
    gray: '#AAAAAA',
    green: '#37AE0F',
    blue: '#00C5FF',
    orange: '#FF6901',
  };

  const TabScreens: TabScreenOptions[] = [
    {
      name: 'map-screen',
      component: MapPage,
      options: {
        title: 'Bản đồ',
        headerTransparent: true,
        headerBackground: () => <View style={tabNavigatorStyles.lightHeader} />,
        tabBarStyle: [
          tabNavigatorStyles.lightTabBar,
          {height: 75 + insets.bottom},
        ],
        tabBarActiveTintColor: colors.green,
        tabBarIcon: ({color, size}) => (
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
        tabBarIcon: ({color, size}) => (
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
        tabBarStyle: [
          tabNavigatorStyles.lightTabBar,
          {height: 75 + insets.bottom},
        ],
        tabBarActiveTintColor: colors.orange,
        tabBarIcon: ({color, size}) => (
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
      screenOptions={() => ({
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: 'rgb(170, 170, 170)',
        tabBarStyle: [
          tabNavigatorStyles.darkTabBar,
          {height: 75 + insets.bottom},
        ],
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

export default TabsNavigator;
