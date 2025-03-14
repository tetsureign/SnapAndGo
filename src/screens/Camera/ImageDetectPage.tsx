// Lib imports
import React, {useRef, useEffect, useState, useReducer} from 'react';
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

// Helper component imports
import {SelectedResultContext} from '@/contexts/DetectionResultContext';
import {DetectResultRenderer} from './components/DetectResultRenderer';

// API imports
import {imageDetect} from '@/api/endpoints/imageDetectApi';

// Style imports
import {styles} from './ImageDetectPage.styles';
import {colors} from '@/styles/colors';

// Type imports
import {DetectionResultType} from '@/types/detectionResult';
import {PhotoParams} from '@/types/photoParams';
import {ErrorChipType} from '@/types/errorChip';

type DetectResultProps = {
  fetchResult: DetectionResultType[];
  type: 'button' | 'rect';
};

const DetectResult = ({fetchResult, type}: DetectResultProps) => {
  return fetchResult.map((element, index) => {
    const isReliable = element.score >= 0.7;
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

  // UI elements
  const [selectedResult, setSelectedResult] = useState({
    result: null,
    index: null,
  });

  // Image resizing
  const [resizeRatio, setResizeRatio] = useState(null);
  const [imageWidthDevice, setImageWidthDevice] = useState(null);

  interface DetectionState {
    isLoading: boolean;
    status: ErrorChipType | null;
    fetchResult: DetectionResultType[] | null;
  }

  type Action =
    | {type: 'FETCH_START'}
    | {type: 'FETCH_SUCCESS'; payload: DetectionResultType[]}
    | {type: 'FETCH_EMPTY'}
    | {type: 'FETCH_FAIL'};

  function detectionReducer(
    state: DetectionState,
    action: Action,
  ): DetectionState {
    switch (action.type) {
      case 'FETCH_START':
        return {...state, isLoading: true};

      case 'FETCH_SUCCESS':
        return {
          isLoading: false,
          status: 'success',
          fetchResult: action.payload,
        };

      case 'FETCH_EMPTY':
        return {
          isLoading: false,
          status: 'empty',
          fetchResult: null,
        };

      case 'FETCH_FAIL':
        return {
          isLoading: false,
          status: 'failed',
          fetchResult: null,
        };

      default:
        return state;
    }
  }

  const [detectionState, detectionDispatch] = useReducer(detectionReducer, {
    isLoading: true,
    status: null,
    fetchResult: null,
  });

  async function getData(sourceUri: string) {
    detectionDispatch({type: 'FETCH_START'});

    try {
      const responseData = await imageDetect(sourceUri);

      console.log('Result: ', responseData);

      if (responseData.success && responseData.data.length > 0) {
        detectionDispatch({type: 'FETCH_SUCCESS', payload: responseData.data});
      } else if (responseData.success && responseData.data.length === 0) {
        detectionDispatch({type: 'FETCH_EMPTY'});
      }
    } catch (error) {
      console.error(error);

      detectionDispatch({type: 'FETCH_FAIL'});
    }
  }

  // Action sheet
  const resultsActionSheetRef = useRef(null);

  function __openActionSheet() {
    resultsActionSheetRef.current?.show();
  }

  useEffect(() => {
    getData(photoUri);
  }, [photoUri]);

  useEffect(() => {
    if (!detectionState.isLoading) {
      __openActionSheet();
    }
  }, [detectionState.isLoading]);

  // Navigation
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
        {detectionState.fetchResult && (
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
          {detectionState.fetchResult ? (
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
            <Button
              onPress={__goBack}
              title="Thử chụp hình lại"
              style={styles.button}
            />
          ) : (
            <Button
              onPress={() => getData(photoUri)}
              title="Thử lại"
              style={styles.button}
            />
          )}

          {/* The search button.*/}
          {selectedResult.result && (
            <View style={styles.actionButtons}>
              <GoButton
                onPress={__searchMap}
                icon={<Search color={colors.blue} width={30} height={30} />}
                text={'Tìm kiếm'}
                color={colors.blue}
              />
            </View>
          )}
        </View>
      </DarkPersistentActionSheet>
    </View>
  );
};

export default ImageDetectPage;
