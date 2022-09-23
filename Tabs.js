/* eslint-disable react/react-in-jsx-scope */
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Iconoir} from 'iconoir-react-native';

import MapPage from './screens/MapPage';
import CameraPage from './screens/CameraPage';
import AccountPage from './screens/AccountPage';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Camera">
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Camera" component={CameraPage} />
      <Tab.Screen name="Account" component={AccountPage} />
    </Tab.Navigator>
  );
};

export default Tabs;
