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

  //   Unreliable results
  unreliableResultsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreliableResultsButtonText: {
    color: '#C7C7C7',
    fontSize: 15,
  },
  unreliableResultsArrow: {
    width: 18,
    height: 18,
    tintColor: '#C7C7C7',
    marginHorizontal: 5,
  },

  //   Search button
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchButton: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButtonViewInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 25,
    color: '#00C5FF',
    paddingLeft: 5,
  },
  descButton: {
    fontSize: 25,
    color: '#5FC314',
    paddingLeft: 5,
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
