import {StyleSheet} from 'react-native';

const tabNavigatorStyles = StyleSheet.create({
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

export default tabNavigatorStyles;
