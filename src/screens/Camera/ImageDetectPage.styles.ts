import {StyleSheet} from 'react-native';
import {DarkTheme} from '@/styles/theme';

export const styles = StyleSheet.create({
  // General
  container: {
    // justifyContent: 'center',
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: DarkTheme.colors.background,
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

  //   Action buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  //   Actionsheet styles
  actionSheetItems: {
    paddingHorizontal: DarkTheme.spacing.md,
    gap: DarkTheme.spacing.xs,
  },
});
