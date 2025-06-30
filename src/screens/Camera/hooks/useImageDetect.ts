import {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useActionSheetInitPoint} from '@/hooks/useActionSheetInitPoint';
import {useDetection} from '@/screens/Camera/hooks/useDetection';
import {DarkTheme} from '@/styles/theme';
import {ImageDetectPageProps} from '@/types/navigation';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useHeaderHeight} from '@react-navigation/elements';

export function useImageDetect({route, navigation}: ImageDetectPageProps) {
  // Get passed photo from routes
  const {photo} = route.params;

  // RN navigation
  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  // Inset
  const insets = useSafeAreaInsets();

  // Result selecting state
  const [selectedResult, setSelectedResult] = useState({
    result: '',
    index: -1,
  });

  // Image resizing states
  const [resizeRatio, setResizeRatio] = useState(1);
  const [imageWidthDevice, setImageWidthDevice] = useState(0);

  // Detection results states and function
  const {detectionState, getData} = useDetection();

  // Action sheet logic
  const resultsActionSheetRef = useRef<ActionSheetRef>(null);
  // Ref: @/components/ActionSheet/ActionSheet.styles.ts
  const sheetIndicatorHeight = DarkTheme.spacing.md * 2 + DarkTheme.spacing.sm;
  const {setSheetChildrenHeight, initSnapPoint} = useActionSheetInitPoint(
    // This AS automatically adds the OS navbar height to its height
    // To calculate the desired location, we need to minus it
    sheetIndicatorHeight + bottomTabHeight - insets.bottom,
  );

  function openActionSheet() {
    resultsActionSheetRef.current?.show();
  }

  // Navigation logic
  function goBack() {
    navigation.navigate('main-camera');
  }

  function searchMap() {
    Linking.openURL(
      'http://maps.google.com/?q=' + selectedResult.result + ' shop',
    );
  }

  useEffect(() => {
    if (!detectionState.isLoading) {
      openActionSheet();
    }
  }, [detectionState.isLoading]);

  // Fetch data on first render

  useEffect(() => {
    getData(photo.uri);
  }, [photo, getData]);

  return {
    photo,
    setResizeRatio,
    setImageWidthDevice,
    detectionState,
    imageWidthDevice,
    resizeRatio,
    selectedResult,
    setSelectedResult,
    headerHeight,
    resultsActionSheetRef,
    initSnapPoint,
    setSheetChildrenHeight,
    goBack,
    getData,
    searchMap,
  };
}
