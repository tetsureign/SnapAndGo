// Lib imports
import React, {useRef, useEffect, useState} from 'react';
import {View, ImageBackground, Button, Linking} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// Icon imports
import {Search} from 'iconoir-react-native';

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
import {DetectionResultType} from '@/types/detectionResult';
import {PhotoParams} from '@/types/photoParams';

type DetectResultProps = {
  fetchResult: DetectionResultType[];
  type: 'button' | 'rect';
};

const DetectResult = ({fetchResult, type}: DetectResultProps) => {
  return fetchResult.map((element, index) => {
    const isReliable = element.score >= 70;
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

const ImageDetectPage = ({route, navigation}) => {
  // Get passed photo from routes
  const {photoUri, photoWidth, photoHeight}: PhotoParams = route.params;

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
  const resultsActionSheetRef = useRef(null);

  function __openActionSheet() {
    resultsActionSheetRef.current?.show();
  }

  useEffect(() => {
    if (!detectionState.isLoading) {
      __openActionSheet();
    }
  }, [detectionState.isLoading]);

  // Fetch data on first render

  useEffect(() => {
    getData(photoUri);
  }, [photoUri, getData]);

  // Navigation logic
  function __goBack() {
    navigation.navigate('main-camera');
  }

  function __searchMap() {
    Linking.openURL(
      'http://maps.google.com/?q=' + selectedResult.result + ' shop',
    );
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <ImageBackground
        source={{uri: photoUri}}
        style={styles.background}
        resizeMode={'contain'}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setResizeRatio(width / photoWidth);
          setImageWidthDevice(width);
        }}>
        {/* Detection rectangles */}
        {detectionState.fetchResult?.length && (
          <View style={styles.rectContainer}>
            <View
              style={{
                width: imageWidthDevice,
                height: photoHeight * resizeRatio,
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

        {/* Loading indicator */}
        {detectionState.isLoading && <LoadingIndicator />}
      </ImageBackground>

      <DarkPersistentActionSheet innerRef={resultsActionSheetRef}>
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
            // TODO: Use a proper button after doing global style
            <Button onPress={__goBack} title="Thử chụp hình lại" />
          ) : (
            // TODO: Use a proper button after doing global style
            <Button onPress={() => getData(photoUri)} title="Thử lại" />
          )}

          {/* The search button.*/}
          {selectedResult.result && (
            <View style={styles.actionButtons}>
              <GoButton
                onPress={__searchMap}
                icon={
                  <Search color={theme.colors.blue} width={30} height={30} />
                }
                text={'Tìm kiếm'}
                color={theme.colors.blue}
              />
            </View>
          )}
        </View>
      </DarkPersistentActionSheet>
    </View>
  );
};

export default ImageDetectPage;
