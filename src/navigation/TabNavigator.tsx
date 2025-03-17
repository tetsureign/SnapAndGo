import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {View, Text, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Map, Search, List} from 'iconoir-react-native';

import MapPage from '@/screens/MapPage';
import CameraStack from './CameraNavigator';
import HistoryPage from '@/screens/HistoryPage';

import tabNavigatorStyles from './TabNavigator.styles';
import {BaseTheme} from '@/styles/theme';

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
  const tabBarHeight = 75;
  const iconSizeMultiplier = 1.5;

  const lightTabBarStyle: ViewStyle[] = [
    tabNavigatorStyles.lightTabBar,
    {height: tabBarHeight + insets.bottom},
  ];

  const darkTabBarStyle: ViewStyle[] = [
    tabNavigatorStyles.darkTabBar,
    {height: tabBarHeight + insets.bottom},
  ];

  const TabScreens: TabScreenOptions[] = [
    {
      name: 'map-screen',
      component: MapPage,
      options: {
        title: 'Bản đồ',
        headerTransparent: true,
        headerBackground: () => <View style={tabNavigatorStyles.lightHeader} />,
        tabBarStyle: lightTabBarStyle,
        tabBarActiveTintColor: BaseTheme.colors.green,
        tabBarIcon: ({color, size}) => (
          <Map
            color={color}
            height={size * iconSizeMultiplier}
            width={size * iconSizeMultiplier}
          />
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
        tabBarStyle: darkTabBarStyle,
        tabBarActiveTintColor: BaseTheme.colors.blue,
        tabBarIcon: ({color, size}) => (
          <Search
            color={color}
            width={size * iconSizeMultiplier}
            height={size * iconSizeMultiplier}
          />
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
        tabBarStyle: lightTabBarStyle,
        tabBarActiveTintColor: BaseTheme.colors.orange,
        tabBarIcon: ({color, size}) => (
          <List
            color={color}
            width={size * iconSizeMultiplier}
            height={size * iconSizeMultiplier}
          />
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
