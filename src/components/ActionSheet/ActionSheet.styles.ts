import {StyleSheet} from 'react-native';
import {DarkTheme} from '@/styles/theme';

export const actionSheetStyle = StyleSheet.create({
  actionSheet: {
    height: '85%',
    backgroundColor: DarkTheme.colors.background,
    borderRadius: DarkTheme.borderRadius.lg,
  },
  actionSheetIndicator: {
    marginTop: DarkTheme.spacing.md,
    width: 60,
  },
});
