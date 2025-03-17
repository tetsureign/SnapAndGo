import React from 'react';
import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
} from 'react-native-actions-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {actionSheetStyle} from './ActionSheet.styles';
import {DarkTheme} from '@/styles/theme';

interface DarkPersistentActionSheetProps extends ActionSheetProps {
  innerRef: React.RefObject<ActionSheetRef>;
}

// This one isn't meant to use with SheetManager.
const DarkPersistentActionSheet = (props: DarkPersistentActionSheetProps) => {
  const insets = useSafeAreaInsets();
  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <ActionSheet
      {...props}
      ref={props.innerRef}
      children={props.children}
      backgroundInteractionEnabled={true}
      containerStyle={{
        backgroundColor: DarkTheme.colors.background,
        borderRadius: DarkTheme.borderRadius.lg,
        paddingBottom: bottomTabHeight,
      }}
      headerAlwaysVisible={true}
      gestureEnabled={true}
      closable={false}
      drawUnderStatusBar={false}
      safeAreaInsets={insets}
      indicatorStyle={actionSheetStyle.actionSheetIndicator}
    />
  );
};

export default DarkPersistentActionSheet;
