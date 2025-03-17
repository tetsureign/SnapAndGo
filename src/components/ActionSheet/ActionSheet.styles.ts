import {StyleSheet} from 'react-native';
import {DarkTheme} from '@/styles/theme';

export const actionSheetStyle = StyleSheet.create({
  actionSheet: {
    // height: '85%',
    backgroundColor: DarkTheme.colors.background,
    borderRadius: DarkTheme.borderRadius.lg,
  },
  actionSheetIndicator: {
    marginVertical: DarkTheme.spacing.md,
    height: DarkTheme.spacing.sm,
  },
});
