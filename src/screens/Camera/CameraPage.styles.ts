import {StyleSheet} from 'react-native';
import {DarkTheme} from '@/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: DarkTheme.colors.background,
  },
  camera: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: DarkTheme.colors.background,
    width: '100%',
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
    color: DarkTheme.colors.text,
    paddingVertical: DarkTheme.spacing.sm,
  },
});

export default styles;
