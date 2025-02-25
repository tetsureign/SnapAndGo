import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'black',
  },
  buttonsPositioner: {
    flex: 1,
    position: 'absolute',
    // bottom: 90,
    width: '100%',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashScreen: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionText: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 10,
  },
});

export default styles;
