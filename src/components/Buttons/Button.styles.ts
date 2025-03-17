import {StyleSheet} from 'react-native';
import {DarkTheme, BaseTheme} from '@/styles/theme';

export const styles = StyleSheet.create({
  // General button
  buttonBackground: {
    padding: DarkTheme.spacing.xs,
    backgroundColor: DarkTheme.colors.buttonBackground,
    borderWidth: DarkTheme.borderWidth.thin,
    borderColor: DarkTheme.colors.buttonBorder,
    borderRadius: DarkTheme.borderRadius.lg,
  },
  // Image capture button. Keeping hardcoded values
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
    borderRadius: DarkTheme.borderRadius.lg,
    borderColor: 'white',
    borderWidth: DarkTheme.borderWidth.thick,
    elevation: 5,
  },

  // Go button
  goButton: {
    padding: BaseTheme.spacing.xs,
  },
  goButtonViewInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: BaseTheme.spacing.xs,
  },
  goButtonText: {
    fontSize: BaseTheme.fontSize.xl,
  },

  // Show hide button
  showHideButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showHideButtonText: {
    // color: '#C7C7C7',
    fontSize: BaseTheme.fontSize.sm,
  },
  // showHideButtonArrow: {
  //   width: 18,
  //   height: 18,
  //   // tintColor: '#C7C7C7',
  //   marginHorizontal: 5,
  // },
});
