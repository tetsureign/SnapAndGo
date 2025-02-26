import React from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {actionSheetStyle} from './ActionSheet.styles';

type ActionSheetProps = {
  innerRef: React.RefObject<ActionSheetRef>;
  children: React.ReactNode;
};

// This one isn't meant to use with SheetManager.
const DarkPersistentActionSheet = ({innerRef, children}: ActionSheetProps) => {
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

export default DarkPersistentActionSheet;
