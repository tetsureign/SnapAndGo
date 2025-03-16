import {StyleSheet} from 'react-native';
import {DarkTheme} from '@/styles/theme';

export const actionSheetStyle = StyleSheet.create({
  actionSheet: {
    height: '85%',
    backgroundColor: DarkTheme.colors.background,
    borderRadius: 10,
  },
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    // paddingBottom: 75,
  },
  actionSheetIndicator: {
    marginTop: 15,
    width: 60,
  },
});
