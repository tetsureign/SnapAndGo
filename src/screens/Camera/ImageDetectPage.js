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

// Helper component imports
import {SelectedResultContext} from '@/contexts/DetectionResultContext';
import {RectRender} from './components/ImageDetectRectDraw';
import {ItemsButtonRender} from './components/ImageDetectResultList';

// API imports
import {imageDetect} from '@/api/endpoints/imageDetectApi';

// Style imports
import {styles} from './ImageDetectPage.styles';

const ResultButtonsRender = ({fetchResult}) => {
  return fetchResult.map((element, index) => {
    let isReliable = false;
    if (element.score >= 0.7) {
      isReliable = true;
    }
    return (
      <ItemsButtonRender
        element={element}
        index={index}
        key={index}
        isReliable={isReliable}
      />
    );
  });
};

const RectanglesRender = ({fetchResult}) => {
  return fetchResult.map((element, index) => {
    let isReliable = false;
    if (element.score >= 0.7) {
      isReliable = true;
    }
    return (
      <RectRender
        element={element}
        index={index}
        key={index}
        isReliable={isReliable}
      />
    );
  });
};

const ImageDetectPage = ({route, navigation}) => {
  // Get passed photo from routes
  const {photoUri, photoWidth, photoHeight} = route.params;

  // RN navigation
  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  // UI elements
  const [isLoading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState({
    result: null,
    index: null,
  });

  // Image resizing
  const [resizeRatio, setResizeRatio] = useState(null);
  const [imageWidthDevice, setImageWidthDevice] = useState(null);

  const [status, setStatus] = useState(null);

  // Get data from API
  const [fetchResult, setFetchResult] = useState(null);

  async function getData(sourceUri) {
    setLoading(true);

    try {
      const responseData = await imageDetect(sourceUri);
      console.log('Result: ', responseData);

      if (responseData.success && responseData.data.length > 0) {
        setFetchResult(responseData.data);
        setStatus('success');
      } else if (responseData.success && responseData.data.length === 0) {
        setStatus('empty');
      }
    } catch (error) {
      console.error(error);
      setStatus('failed');
    } finally {
      setLoading(false);
    }
  }

  function __getResults() {
    setLoading(true);
    getData(photoUri);
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
    if (!isLoading) {
      __openActionSheet();
    }
  }, [isLoading]);

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
        {fetchResult && (
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
                <RectanglesRender fetchResult={fetchResult} />
              </SelectedResultContext.Provider>
            </View>
          </View>
        )}

        {/* Error chip */}
        {status && (
          <View style={styles.errorContainer}>
            <View style={{marginTop: headerHeight + 15}} />
            <ErrorChip status={status} />
          </View>
        )}

        {/* Loading indicator */}
        {isLoading && <LoadingIndicator />}
      </ImageBackground>

      <DarkPersistentActionSheet innerRef={resultsActionSheetRef}>
        <View
          style={[
            styles.actionSheetItems,
            {paddingBottom: bottomTabHeight + 15},
          ]}>
          {/* The main buttons */}
          {fetchResult ? (
            <SelectedResultContext.Provider
              value={{
                selectedResult,
                setSelectedResult,
              }}>
              <ResultButtonsRender fetchResult={fetchResult} />
            </SelectedResultContext.Provider>
          ) : status === 'empty' ? (
            <Button
              onPress={__goBack}
              title="Thử chụp hình lại"
              style={styles.button}
            />
          ) : (
            <Button
              onPress={__getResults}
              title="Thử lại"
              style={styles.button}
            />
          )}

          {/* The search button.*/}
          {/* TODO: Not showing rn with checks on. Temporarily turned check off for debugging*/}
          {/* {selectedResult.result && ( */}
          <View style={styles.actionButtons}>
            <GoButton
              onPress={__searchMap}
              icon={<Search color="#00C5FF" width={30} height={30} />}
              text={'Tìm kiếm'}
              color={'#00C5FF'}
            />
          </View>
          {/* )} */}
        </View>
      </DarkPersistentActionSheet>
    </View>
  );
};

export default ImageDetectPage;
