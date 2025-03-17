import {StyleSheet, ViewStyle} from 'react-native';
import {DarkTheme} from '@/styles/theme';

const rectStyle: ViewStyle = {
  borderWidth: DarkTheme.borderWidth.thick,
  borderRadius: DarkTheme.borderRadius.lg,
  shadowRadius: DarkTheme.shadow.lg.shadowRadius,
};

export const styles = StyleSheet.create({
  // Buttons
  itemBackground: {
    padding: DarkTheme.spacing.xs,
    backgroundColor: 'transparent',
    borderWidth: DarkTheme.borderWidth.thin,
    borderColor: 'transparent',
  },
  itemsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsText: {
    fontSize: DarkTheme.fontSize.xl,
  },
  itemsTextWhite: {
    color: DarkTheme.colors.text,
  },
  itemsTextFade: {
    color: 'rgba(255, 255, 255, 0.25)',
  },

  // Rectangles
  rect: {
    position: 'absolute',
  },
  rectFade: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...rectStyle,
  },
  rectWhite: {
    borderColor: 'white',
    ...rectStyle,
  },
});
