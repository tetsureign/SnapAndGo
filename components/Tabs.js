import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapPage from '../screens/MapPage';
import CameraStack from '../screens/Camera/CameraPagesNavigator';
import HomeScreen from '../screens/HomeScreen';
import AccountPage from '../screens/AccountPage';
import InfoPage from '../screens/InfoPage';
import HistoryPage from '../screens/HistoryPage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const insets = useSafeAreaInsets();

  // TODO: global style this
  const colors = {
    gray: '#AAAAAA',
    green: '#37AE0F',
    blue: '#00C5FF',
    orange: '#FF6901',
  };

  return (
    <Tab.Navigator
      initialRouteName="camera-screen"
      shifting={true}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: 'rgb(170, 170, 170)',
        tabBarShowLabel: false,
        tabBarStyle: [styles.darkTabBar, {height: 75 + insets.bottom}],
      })}>
      <Tab.Screen
        name="map-screen"
        component={MapPage}
        options={{
          title: 'Bản đồ',
          headerTransparent: true,
          headerBackground: () => <View style={styles.lightHeader} />,
          tabBarStyle: [styles.lightTabBar, {height: 75 + insets.bottom}],
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/icons/map.png')}
                style={[
                  styles.iconSize,
                  {tintColor: focused ? colors.green : colors.gray},
                ]}
              />
              {focused && (
                <Text
                  style={{
                    color: focused ? colors.green : colors.gray,
                  }}>
                  Bản đồ
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="camera-screen"
        component={CameraStack}
        options={{
          title: 'Camera',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/icons/search.png')}
                style={[
                  styles.iconSize,
                  {tintColor: focused ? colors.blue : colors.gray},
                ]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="history-page"
        component={HistoryPage}
        options={{
          name: 'Lịch sử',
          tabBarStyle: [styles.lightTabBar, {height: 75 + insets.bottom}],
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/icons/list.png')}
                style={[
                  styles.iconSize,
                  {tintColor: focused ? colors.orange : colors.gray},
                ]}
              />
              {focused && (
                <Text style={{color: focused ? colors.orange : colors.gray}}>
                  Lịch sử
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
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSize: {
    width: 40,
    height: 40,
  },
});

export default Tabs;
