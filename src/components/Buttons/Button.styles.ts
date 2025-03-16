import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // General button
  buttonBackground: {
    padding: 5,
    backgroundColor: '#646464',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 10,
  },
  // Image capture button
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 5,
  },
  imgPickerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(33, 33, 33, 0.85)',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 5,
    elevation: 5,
  },

  // Go button
  goButton: {
    margin: 5,
  },
  goButtonViewInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  goButtonText: {
    fontSize: 25,
  },

  // Show hide button
  showHideButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showHideButtonText: {
    // color: '#C7C7C7',
    fontSize: 15,
  },
  // showHideButtonArrow: {
  //   width: 18,
  //   height: 18,
  //   // tintColor: '#C7C7C7',
  //   marginHorizontal: 5,
  // },
});
