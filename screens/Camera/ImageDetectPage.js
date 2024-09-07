import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import ActionSheet, {useScrollHandlers} from 'react-native-actions-sheet';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import LoadingIndicator from '../../components/LoadingIndicator';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import {ErrorChip} from '../../components/ErrorMessage/ErrorChip';
import * as api from '../../api/api';
import {SelectedResultContext} from '../../contexts/DetectionResultContext';
import {RectRender} from './ImageDetectRectDraw';
import {ItemsButtonRender} from './ImageDetectResultList';
import {styles} from './ImageDetectStyles';

const ImageDetectPage = ({route, navigation}) => {
  const {photoUri, photoWidth, photoHeight} = route.params;

  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  const resultsActionSheetRef = useRef(null);

  const [result, setResult] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const [resizeRatio, setResizeRatio] = useState(null);
  const [imageWidthDevice, setImageWidthDevice] = useState(null);

  const [isDetectPressed, setDetectPressed] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultsActionsheetOpened, setResultsActionsheetOpened] =
    useState(false);
  const [isUnreliableResultsOpened, setUnreliableResultsOpened] =
    useState(false);

  const [errorCode, setErrorCode] = useState(null);

  const buttons = [];
  const buttonsLow = [];
  const rectRegions = [];
  const rectRegionsLow = [];
  let itemsLowCount = 0;

  const FetchAPI = async source => {
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
      setResult(responseData);
      setErrorCode(200);
      setLoading(false);
    } else {
      setErrorCode(500);
      setLoading(false);
    }
  };

  if (errorCode === 200) {
    if (result && result.length >= 1) {
      result.map((element, index) => {
        if (element.score >= 0.7) {
          buttons.push(
            <ItemsButtonRender
              element={element}
              index={index}
              key={index}
              isReliable={true}
            />,
          );
          rectRegions.push(
            <RectRender
              element={element}
              index={index}
              key={index}
              isReliable={true}
            />,
          );
        } else {
          itemsLowCount++;
          buttonsLow.push(
            <ItemsButtonRender
              element={element}
              index={index}
              key={index}
              isReliable={false}
            />,
          );
          rectRegionsLow.push(
            <RectRender
              element={element}
              index={index}
              key={index}
              isReliable={false}
            />,
          );
        }
      });
    } else if (result.length === 0) {
      setErrorCode(400);
    }
  }

  // useEffect(() => {
  //   setLoading(true);
  //   setDetectPressed(true);
  //   FetchAPI(photoUri);
  // }, [photoUri]);

  const __getResults = () => {
    setLoading(true);
    setDetectPressed(true);
    FetchAPI(photoUri);
  };

  const __goBack = () => {
    navigation.navigate('Trang Camera');
  };

  const __showResults = () => {
    resultsActionSheetRef.current?.show();
    setResultsActionsheetOpened(true);
  };

  const __unreliableResultsCollapse = () => {
    if (isUnreliableResultsOpened === false) {
      setUnreliableResultsOpened(true);
    } else {
      setUnreliableResultsOpened(false);
    }
  };

  const __searchMap = () => {
    Linking.openURL('http://maps.google.com/?q=' + selectedResult + ' shop');
  };

  useEffect(() => {
    if (!isLoading && isDetectPressed && errorCode === 200) {
      resultsActionSheetRef.current?.show();
      setResultsActionsheetOpened(true);
    }
  }, [isLoading, isDetectPressed, errorCode]);

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
        {errorCode && (
          <View style={styles.errorContainer}>
            <View style={{marginTop: headerHeight + 15}} />
            <ErrorChip errorCode={errorCode} />
          </View>
        )}

        {result && (
          <View style={styles.rectContainer}>
            <View
              style={{
                width: imageWidthDevice,
                height: photoHeight * resizeRatio,
              }}>
              <SelectedResultContext.Provider
                value={{
                  selectedResultIndex,
                  setSelectedResultIndex,
                  setSelectedResult,
                  resizeRatio,
                }}>
                {rectRegions}
                {rectRegionsLow}
              </SelectedResultContext.Provider>
            </View>
          </View>
        )}

        {result === null ? (
          <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
            <Button
              onPress={__getResults}
              title="Nhận diện"
              style={styles.button}
            />
          </View>
        ) : (
          errorCode === 400 && (
            <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
              <Button
                onPress={__goBack}
                title="Thử chụp hình lại"
                style={styles.button}
              />
            </View>
          )
        )}

        {isResultsActionsheetOpened === false && errorCode === 200 && (
          <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
            <Button
              onPress={__showResults}
              title="Danh sách kết quả"
              style={styles.button}
            />
          </View>
        )}
        {isLoading && <LoadingIndicator />}
      </ImageBackground>

      <ActionSheet
        ref={resultsActionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        // useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={true}
        drawUnderStatusBar={false}
        indicatorStyle={{marginTop: 15, width: 60}}
        onClose={() => {
          setResultsActionsheetOpened(false);
        }}>
        <View
          style={[
            styles.actionSheetItems,
            {paddingBottom: bottomTabHeight + 15},
          ]}>
          <SelectedResultContext.Provider
            value={{
              selectedResultIndex,
              setSelectedResultIndex,
              setSelectedResult,
            }}>
            {buttons}
          </SelectedResultContext.Provider>

          {itemsLowCount >= 1 && (
            <TouchableOpacity
              style={styles.unreliableResultsButton}
              onPress={__unreliableResultsCollapse}>
              <Text style={styles.unreliableResultsButtonText}>
                Kết quả có độ chính xác thấp
              </Text>
              {isUnreliableResultsOpened ? (
                <Image
                  source={require('../../assets/icons/nav-arrow-up.png')}
                  style={styles.unreliableResultsArrow}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/nav-arrow-down.png')}
                  style={styles.unreliableResultsArrow}
                />
              )}
            </TouchableOpacity>
          )}
          <SelectedResultContext.Provider
            value={{
              selectedResultIndex,
              setSelectedResultIndex,
              setSelectedResult,
            }}>
            {isUnreliableResultsOpened && buttonsLow}
          </SelectedResultContext.Provider>
          {selectedResult && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={__searchMap}>
                <View style={styles.searchButtonViewInside}>
                  <Image
                    source={require('../../assets/icons/search.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: '#00C5FF',
                    }}
                  />
                  <Text style={styles.searchText}>Tìm kiếm</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ActionSheet>
    </View>
  );
};

export default ImageDetectPage;
