import React, {useRef, useEffect, useState} from 'react';
import {View, ImageBackground, Button, Linking} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import LoadingIndicator from '../../components/LoadingIndicator';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import {ErrorChip} from '../../components/ErrorMessage/ErrorChip';
import * as api from '../../api/api';
import {SelectedResultContext} from '../../contexts/DetectionResultContext';
import {RectRender} from './ImageDetectRectDraw';
import {ItemsButtonRender} from './ImageDetectResultList';
import {GoButton} from '../../components/Buttons/buttons';
import {styles} from './ImageDetectStyles';
import {DarkPersistentActionSheet} from '../../components/ActionSheet/actionsheet';

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
  const [isLoading, setLoading] = useState(false);
  const [isDetectPressed, setDetectPressed] = useState(false);
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

  async function getData(source) {
    let photoUpload = {uri: source};
    let formData = new FormData();
    formData.append('image', {
      uri: photoUpload.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const responseData = await api.Post('/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (responseData) {
      console.log('Result: ', responseData);
      if (responseData.length > 0) {
        setFetchResult(responseData);
        setStatus('success');
      } else {
        setStatus('empty');
      }
      setLoading(false);
    } else {
      setStatus('failed');
      setLoading(false);
    }
  }

  function __getResults() {
    setLoading(true);
    setDetectPressed(true);
    getData(photoUri);
  }

  // Action sheet
  const resultsActionSheetRef = useRef(null);

  function __openActionSheet() {
    resultsActionSheetRef.current?.show();
  }

  useEffect(() => {
    if (!isLoading && isDetectPressed && status === 'success') {
      __openActionSheet();
    }
  }, [isLoading, isDetectPressed, status]);

  // Navigation
  function __goBack() {
    navigation.navigate('Trang Camera');
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

        {/* The blue buttons */}
        {fetchResult === null ? (
          <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
            <Button
              onPress={__getResults}
              title="Nhận diện"
              style={styles.button}
            />
          </View>
        ) : (
          status === 'empty' && (
            <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
              <Button
                onPress={__goBack}
                title="Thử chụp hình lại"
                style={styles.button}
              />
            </View>
          )
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
          <SelectedResultContext.Provider
            value={{
              selectedResult,
              setSelectedResult,
            }}>
            <ResultButtonsRender fetchResult={fetchResult} />
          </SelectedResultContext.Provider>

          {/* The search button.*/}
          {selectedResult && (
            <View style={styles.actionButtons}>
              <GoButton
                onPress={__searchMap}
                icon={require('../../assets/icons/search.png')}
                text={'Tìm kiếm'}
                color={'#00C5FF'}
              />
            </View>
          )}
        </View>
      </DarkPersistentActionSheet>
    </View>
  );
};

export default ImageDetectPage;
