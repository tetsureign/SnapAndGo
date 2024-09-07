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

  //   Detect button
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    // flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },

  //   Search button
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  //   Actionsheet styles
  actionSheet: {
    backgroundColor: '#434343',
    borderRadius: 10,
  },
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    // paddingBottom: 75,
  },

  //   Desc Actionsheet
  descTitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    color: 'white',
  },
});
