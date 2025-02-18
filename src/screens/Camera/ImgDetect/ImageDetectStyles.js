import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // General
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#212121',
  },

  // Error messages area
  errorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
  },

  // Outside Actionsheet
  //   Rect region style
  rectContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  //   Retry buttons TODO use a proper one after doing global style
  button: {
    // flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },

  //   Action buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  //   Actionsheet styles
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    // paddingBottom: 75,
  },
});
