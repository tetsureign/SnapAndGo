import React from 'react';
import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
} from 'react-native-actions-sheet';
import {actionSheetStyle} from './ActionSheet.styles';

interface DarkPersistentActionSheetProps extends ActionSheetProps {
  innerRef: React.RefObject<ActionSheetRef>;
}

// This one isn't meant to use with SheetManager.
const DarkPersistentActionSheet = (props: DarkPersistentActionSheetProps) => {
  return (
    <ActionSheet
      {...props}
      ref={props.innerRef}
      backgroundInteractionEnabled={true}
      containerStyle={actionSheetStyle.actionSheet}
      headerAlwaysVisible={true}
      gestureEnabled={true}
      closable={false}
      drawUnderStatusBar={false}
      indicatorStyle={actionSheetStyle.actionSheetIndicator}>
      {props.children}
    </ActionSheet>
  );
};

export default DarkPersistentActionSheet;
