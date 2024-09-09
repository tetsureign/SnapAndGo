import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {actionSheetStyle} from './styles';

// This one isn't meant to use with SheetManager.
export const DarkPersistentActionSheet = ({innerRef, children}) => {
  return (
    <ActionSheet
      ref={innerRef}
      backgroundInteractionEnabled={true}
      containerStyle={actionSheetStyle.actionSheet}
      // useBottomSafeAreaPadding={true}
      headerAlwaysVisible={true}
      gestureEnabled={true}
      closable={false}
      drawUnderStatusBar={false}
      indicatorStyle={actionSheetStyle.actionSheetIndicator}
      snapPoints={[20, 60, 100]}
      initialSnapIndex={1}>
      {children}
    </ActionSheet>
  );
};
