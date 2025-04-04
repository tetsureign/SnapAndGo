import React from 'react';
import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
} from 'react-native-actions-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
      ref={props.innerRef}
      children={props.children}
      {...props}
      backgroundInteractionEnabled
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
      isModal={false}
    />
  );
};

export default DarkPersistentActionSheet;
