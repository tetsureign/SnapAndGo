// Lib imports
import React, {useRef, useEffect, useState} from 'react';
import {View, ImageBackground, Linking} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// Icon imports
import {Search} from 'iconoir-react-native';
import {Refresh} from 'iconoir-react-native';
import {ArrowLeft} from 'iconoir-react-native';

// Component imports
import {LoadingIndicator} from '@/components/LoadingIndicator';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import {ErrorChip} from '@/components/ErrorMessage';
import {GoButton} from '@/components/Buttons';
import {DarkPersistentActionSheet} from '@/components/ActionSheet/';

// Helper imports
import {SelectedResultContext} from '@/contexts/DetectionResultContext';
import {DetectResultRenderer} from './components/DetectResultRenderer';
import {useDetection} from './hooks/useDetection';

// Style imports
import {styles} from './ImageDetectPage.styles';
import {theme} from '@/styles/theme';

// Type imports
import {DetectionResultType} from '@/types/detection';
import {ImageDetectPageProps} from '@/types/navigation';
import {ActionSheetRef} from 'react-native-actions-sheet';

type DetectResultProps = {
  fetchResult: DetectionResultType[];
  type: 'button' | 'rect';
};

const RELIABILITY_THRESHOLD = 70;

const DetectResult = ({fetchResult, type}: DetectResultProps) => {
  return fetchResult.map((element, index) => {
    const isReliable = element.score >= RELIABILITY_THRESHOLD;
    return (
      <DetectResultRenderer
        element={element}
        index={index}
        key={index}
        isReliable={isReliable}
        renderType={type}
      />
    );
  });
};

const ImageDetectPage = ({route, navigation}: ImageDetectPageProps) => {
  // Get passed photo from routes
  const {photo} = route.params;

  // RN navigation
  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

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

  function openActionSheet() {
    resultsActionSheetRef.current?.show();
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

  // Navigation logic
  function goBack() {
    navigation.navigate('main-camera');
  }

  function searchMap() {
    Linking.openURL(
      'http://maps.google.com/?q=' + selectedResult.result + ' shop',
    );
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <ImageBackground
        source={{uri: photo.uri}}
        style={styles.background}
        resizeMode={'contain'}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setResizeRatio(width / photo.width);
          setImageWidthDevice(width);
        }}>
        {/* Detection rectangles */}
        {detectionState.fetchResult?.length && (
          <View style={styles.rectContainer}>
            <View
              style={{
                width: imageWidthDevice,
                height: photo.height * resizeRatio,
              }}>
              <SelectedResultContext.Provider
                value={{
                  selectedResult,
                  setSelectedResult,
                  resizeRatio,
                }}>
                <DetectResult
                  fetchResult={detectionState.fetchResult}
                  type="rect"
                />
              </SelectedResultContext.Provider>
            </View>
          </View>
        )}

        {/* Error chip */}
        {detectionState.status && (
          <View style={styles.errorContainer}>
            <View style={{marginTop: headerHeight + 15}} />
            <ErrorChip status={detectionState.status} />
          </View>
        )}
      </ImageBackground>

      <DarkPersistentActionSheet
        innerRef={resultsActionSheetRef}
        // TODO: Dynamic MIDDLE snap point
        snapPoints={[20, 60, 100]}
        initialSnapIndex={0}>
        <View
          style={[
            styles.actionSheetItems,
            {paddingBottom: bottomTabHeight + 15},
          ]}>
          {/* The main buttons */}
          {detectionState.fetchResult?.length ? (
            <SelectedResultContext.Provider
              value={{
                selectedResult,
                setSelectedResult,
              }}>
              <DetectResult
                fetchResult={detectionState.fetchResult}
                type="button"
              />
            </SelectedResultContext.Provider>
          ) : detectionState.status === 'empty' ? (
            <GoButton
              onPress={goBack}
              icon={
                // TODO: Use proper width and height after doing global style
                <ArrowLeft color={theme.colors.blue} width={30} height={30} />
              }
              text={'Trở về'}
              color={theme.colors.blue}
            />
          ) : (
            <GoButton
              onPress={() => getData(photo.uri)}
              icon={
                // TODO: Use proper width and height after doing global style
                <Refresh color={theme.colors.blue} width={30} height={30} />
              }
              text={'Thử lại'}
              color={theme.colors.blue}
            />
          )}

          {/* The search button.*/}
          {selectedResult.result && (
            <View style={styles.actionButtons}>
              <GoButton
                onPress={searchMap}
                icon={
                  // TODO: Use proper width and height after doing global style
                  <Search color={theme.colors.blue} width={30} height={30} />
                }
                text={'Tìm kiếm'}
                color={theme.colors.blue}
              />
            </View>
          )}
        </View>
      </DarkPersistentActionSheet>

      {/* Loading indicator */}
      {detectionState.isLoading && <LoadingIndicator />}
    </View>
  );
};

export default ImageDetectPage;
