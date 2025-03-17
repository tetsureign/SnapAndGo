import {StyleSheet, ViewStyle} from 'react-native';

import {BaseTheme} from '@/styles/theme';

const baseValues: ViewStyle = {
  marginHorizontal: BaseTheme.spacing.md,
  paddingVertical: BaseTheme.spacing.xs,
  paddingHorizontal: BaseTheme.spacing.md,
  borderRadius: BaseTheme.borderRadius.lg,
  opacity: BaseTheme.opacity.medium,
};

const styles = StyleSheet.create({
  backgroundSuccess: {
    backgroundColor: BaseTheme.colors.green,
    ...baseValues,
  },
  backgroundError: {
    backgroundColor: BaseTheme.colors.orange,
    ...baseValues,
  },
  backgroundNeutral: {
    backgroundColor: BaseTheme.colors.gray,
    ...baseValues,
  },
  message: {
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
