import {StyleSheet} from 'react-native';

export const cameraButtonStyles = StyleSheet.create({
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
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
  imgPickerButtonIcon: {
    width: 30,
    height: 30,
  },
});
